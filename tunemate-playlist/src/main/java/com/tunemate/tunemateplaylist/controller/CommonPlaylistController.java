package com.tunemate.tunemateplaylist.controller;

import com.tunemate.tunemateplaylist.domain.Playlist;
import com.tunemate.tunemateplaylist.dto.PlaylistResponseDto;
import com.tunemate.tunemateplaylist.service.CommonPlaylistServiceImpl;
import lombok.RequiredArgsConstructor;
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
    private final Map<Long, SseEmitter> SseEmitters = new ConcurrentHashMap<>();
    @GetMapping("/playlist/{playlistId}")
    public ResponseEntity<SseEmitter> getCommonPlaylist(@PathVariable("playlistId") String playlistId, @RequestHeader("UserId") long userId) throws IOException {
        SseEmitter sseEmitter = new SseEmitter(1800000l);
        System.out.println(SseEmitters);
        SseEmitters.put(userId,sseEmitter);
        System.out.println(SseEmitters);
        System.out.println(SseEmitters.size());
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
}
