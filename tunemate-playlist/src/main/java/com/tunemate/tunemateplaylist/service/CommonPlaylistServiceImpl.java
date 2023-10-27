package com.tunemate.tunemateplaylist.service;

import com.tunemate.tunemateplaylist.domain.Playlist;
import com.tunemate.tunemateplaylist.dto.PlaylistResponseDto;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class CommonPlaylistServiceImpl implements CommonPlaylistService{

    private final WebClient.Builder webClientBuilder;

    private final Map<String, List<SseEmitter>> SseEmitters = new ConcurrentHashMap<>();

    public CommonPlaylistServiceImpl(WebClient.Builder webClientBuilder){
        this.webClientBuilder = webClientBuilder;
    }


    // 공동 플레이리스트 조회
    public PlaylistResponseDto getIndividualPlaylist(String playlistId) {
        // AuthService 에 Token 요청
        String token = getToken();

        PlaylistResponseDto playlistResponseDto = webClientBuilder.build().get().uri(uriBuilder -> uriBuilder.path("/playlists/"+playlistId).queryParam("fields","description,id,name,images,tracks(items(track(album(images),artists(name),id,name,uri)))").build()).header("Authorization", "Bearer " + token)
                .retrieve().bodyToMono(PlaylistResponseDto.class).block();

        return playlistResponseDto;
    }


    // 스포티파이 유저 ID 요청
    private String getSpotifyUserId() {
        return "31nmxiqhjnusfymqkaki3usnsose";
    }

    // 토큰 요청
    private String getToken() {
        return "BQBrIzZXc0nooGJhJDGHOPy80Z4UfyKjpgIXwFOklBVlDCvuHHiirxOKp4xwDDe22JjoSQByQtUlgoa0cAAafH8CsRd6RLqCakL2W5fc3CHMTpWIQltuZzVrxfO425Oe00p56pOIcgAKvFt6_Zp_tgXJhNHDaOqgT1DxWqlROIKE2LimoUYsr0ZU1bWcMmqmZka2mw9CDopME6Ca-Q9ygwHAETZcFfHHYVYSgV6-CxeWbicwPuTs6mjatVomfcFrGFX5Rj2empblAtf7n1YE9c-plmk4C66K3w1NW1dxEpw";
    }
}
