package com.tunemate.tunemateplaylist.controller;

import com.tunemate.tunemateplaylist.domain.Playlist;
import com.tunemate.tunemateplaylist.dto.*;
import com.tunemate.tunemateplaylist.service.CommonPlaylistServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class CommonPlaylistController {

    private final CommonPlaylistServiceImpl commonPlaylistService;
    private final Map<String, List<SseEmitter>> SseEmitters = new ConcurrentHashMap<>();

    // 공동 플레이리스트 조회
    @GetMapping("/playlists/{playlistId}")
    public ResponseEntity<SseEmitter> getCommonPlaylist(@PathVariable("playlistId") String playlistId, @RequestHeader("UserId") String userId) throws IOException {
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
        PlaylistResponseDto playlistResponseDto = commonPlaylistService.getIndividualPlaylist(userId,playlistId);
        sseEmitter.send(playlistResponseDto, MediaType.APPLICATION_JSON);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_EVENT_STREAM_VALUE)
                .body(sseEmitter);
    }

    // 공동 플레이리스트 생성
    @PostMapping("/playlists")
    public void createCommonPlaylist(@RequestHeader("UserId") String userId,@RequestBody PlaylistCreateDto playlistCreateDto) throws ParseException {
        commonPlaylistService.createPlaylist(userId,playlistCreateDto);
    }

    private void updatePlaylistAndSendResponse(String userId,String playlistId) {
        PlaylistResponseDto playlistResponseDto = commonPlaylistService.getIndividualPlaylist(userId,playlistId);
        System.out.println(SseEmitters);
        int size = SseEmitters.get(playlistId).size();
        for(int i=0;i<size;i++){
            try{
                SseEmitters.get(playlistId).get(i).send(playlistResponseDto, MediaType.APPLICATION_JSON);
                log.info("연결된 사람에게 전송");


            }
            catch (IOException | IllegalStateException e){
                SseEmitters.get(playlistId).remove(SseEmitters.get(playlistId).get(i));
                log.info("연결된 사람에게 전송 실패");
            }
            catch (NullPointerException e){
                log.info("Null");
            }
        }


    }

    // 공동 플레이리스트에 트랙 추가
    @PostMapping("/playlists/{playlistId}/tracks")
    public void createTrack(@RequestHeader("UserId") String userId,@PathVariable("playlistId") String playlistId, @RequestBody TrackCreateDto trackCreateDto) throws IOException, ParseException {
        commonPlaylistService.createTrack(userId,playlistId, trackCreateDto);
        updatePlaylistAndSendResponse(userId,playlistId);

    }

    // 공동 플레이리스트에 트랙 삭제
    @DeleteMapping("/playlists/{playlistId}/tracks")
    public void deleteTrack(@RequestHeader("UserId") String userId,@PathVariable("playlistId") String playlistId, @RequestBody TrackDeleteRequestDto trackDeleteRequestDto) throws IOException {
        commonPlaylistService.deleteTrack(userId,playlistId,trackDeleteRequestDto);
        updatePlaylistAndSendResponse(userId,playlistId);

    }

    // 공동 플레이리스트 트랙 순서 변경
    @PutMapping("/playlists/{playlistId}/tracks")
    public void changeTrack(@RequestHeader("UserId") String userId,@PathVariable("playlistId") String playlistId, @RequestBody TrackChangeRequestDto trackChangeRequestDto){
        commonPlaylistService.changeTrack(userId,playlistId,trackChangeRequestDto);
        updatePlaylistAndSendResponse(userId,playlistId);
    }

}
