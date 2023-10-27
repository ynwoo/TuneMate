package com.tunemate.tunemateplaylist.controller;

import com.tunemate.tunemateplaylist.domain.Playlist;
import com.tunemate.tunemateplaylist.dto.PlaylistCreateDto;
import com.tunemate.tunemateplaylist.dto.PlaylistResponseDto;
import com.tunemate.tunemateplaylist.dto.RelationDto;
import com.tunemate.tunemateplaylist.dto.TrackCreateDto;
import com.tunemate.tunemateplaylist.service.CommonPlaylistServiceImpl;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.management.relation.Relation;
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
    private final Map<Long, SseEmitter> SseEmitters = new ConcurrentHashMap<>();

    // 공동 플레이리스트 조회
    @GetMapping("/playlist/{playlistId}")
    public ResponseEntity<SseEmitter> getCommonPlaylist(@PathVariable("playlistId") String playlistId, @RequestHeader("UserId") long userId) throws IOException {
        SseEmitter sseEmitter = new SseEmitter(1800000l);
        SseEmitters.put(userId,sseEmitter);
        // sse 연결 끝나면 객체 삭제
        sseEmitter.onCompletion(() -> {
            SseEmitters.remove(userId);
        });
        // sse 연결 시간 초과 시 객체 삭제
        sseEmitter.onTimeout(() -> {
            SseEmitters.remove(userId);
        });
        PlaylistResponseDto playlistResponseDto = commonPlaylistService.getIndividualPlaylist(playlistId);
        sseEmitter.send(playlistResponseDto, MediaType.APPLICATION_JSON);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_EVENT_STREAM_VALUE)
                .body(sseEmitter);
    }

    // 공동 플레이리스트 생성
    @PostMapping("/playlists")
    public void createCommonPlaylist(@RequestBody PlaylistCreateDto playlistCreateDto) throws ParseException {
        commonPlaylistService.createPlaylist(playlistCreateDto);
    }

    // 공동 플레이리스트에 트랙 추가
    @PostMapping("/playlists/tracks/{playlistId}")
    public void createTrack(@PathVariable("playlistId") String playlistId, @RequestBody TrackCreateDto trackCreateDto) throws IOException {
        commonPlaylistService.createTrack(playlistId, trackCreateDto);
        RelationDto relationDto = commonPlaylistService.getRelationId(playlistId);
        PlaylistResponseDto playlistResponseDto = commonPlaylistService.getIndividualPlaylist(playlistId);
        SseEmitters.get(relationDto.getUser1()).send(playlistResponseDto, MediaType.APPLICATION_JSON);
        SseEmitters.get(relationDto.getUser2()).send(playlistResponseDto, MediaType.APPLICATION_JSON);
    }
}
