package com.tunemate.tunemateplaylist.controller;

import com.tunemate.tunemateplaylist.domain.Playlist;
import com.tunemate.tunemateplaylist.dto.*;
import com.tunemate.tunemateplaylist.service.CommonPlaylistServiceImpl;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;


import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


@RestController
@CrossOrigin(value = "*", allowedHeaders = "*")
@RequiredArgsConstructor
@RequestMapping("/common")
public class CommonPlaylistController {

    private final CommonPlaylistServiceImpl commonPlaylistService;
    private final Map<String, List<SseEmitter>> SseEmitters = new ConcurrentHashMap<>();

    // 공동 플레이리스트 조회
    @GetMapping("/playlist/{playlistId}")
    public ResponseEntity<SseEmitter> getCommonPlaylist(@PathVariable("playlistId") String playlistId, @RequestHeader("UserId") long userId) throws IOException {
        System.out.println("연결 : "+ userId);
        SseEmitter sseEmitter = new SseEmitter(1800000l);
        SseEmitters.computeIfAbsent(playlistId, k -> new ArrayList<>()).add(sseEmitter);

        // sse 연결 끝나면 객체 삭제
        sseEmitter.onCompletion(() -> {
            System.out.println("연결끝났어~");
            SseEmitters.get(playlistId).remove(sseEmitter);
        });
        // sse 연결 시간 초과 시 객체 삭제
        sseEmitter.onTimeout(() -> {
            SseEmitters.get(playlistId).remove(sseEmitter);
        });
        System.out.println(SseEmitters);
        PlaylistResponseDto playlistResponseDto = commonPlaylistService.getIndividualPlaylist(playlistId);
        sseEmitter.send(playlistResponseDto, MediaType.APPLICATION_JSON);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_EVENT_STREAM_VALUE)
                .body(sseEmitter);
    }

//    @GetMapping("/sse/close")
//    public void closeSSE(@)

    // 공동 플레이리스트 생성
    @PostMapping("/playlists")
    public void createCommonPlaylist(@RequestBody PlaylistCreateDto playlistCreateDto) throws ParseException {
        commonPlaylistService.createPlaylist(playlistCreateDto);
    }

    private void updatePlaylistAndSendResponse(String playlistId) {
        PlaylistResponseDto playlistResponseDto = commonPlaylistService.getIndividualPlaylist(playlistId);
        System.out.println(SseEmitters);
        int size = SseEmitters.get(playlistId).size();
        for(int i=0;i<size;i++){
            try{
                SseEmitters.get(playlistId).get(i).send(playlistResponseDto, MediaType.APPLICATION_JSON);
                System.out.println("연결된 사람에게 전송");

            }
            catch (IOException | IllegalStateException e){
                SseEmitters.get(playlistId).remove(SseEmitters.get(playlistId).get(i));
                System.out.println("연결된 사람에게 전송 실패");
            }
            catch (NullPointerException e){
                System.out.println("Null");
            }
        }


    }

    // 공동 플레이리스트에 트랙 추가
    @PostMapping("/playlists/{playlistId}/tracks")
    public void createTrack(@PathVariable("playlistId") String playlistId, @RequestBody TrackCreateDto trackCreateDto) throws IOException {
        commonPlaylistService.createTrack(playlistId, trackCreateDto);
        updatePlaylistAndSendResponse(playlistId);

    }

    // 공동 플레이리스트에 트랙 삭제
    @DeleteMapping("/playlists/{playlistId}/tracks")
    public void deleteTrack(@PathVariable("playlistId") String playlistId, @RequestBody TrackDeleteRequestDto trackDeleteRequestDto) throws IOException {
        commonPlaylistService.deleteTrack(playlistId,trackDeleteRequestDto);
        updatePlaylistAndSendResponse(playlistId);

    }

}
