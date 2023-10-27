package com.tunemate.tunemateplaylist.service;

import com.tunemate.tunemateplaylist.domain.Playlist;
import com.tunemate.tunemateplaylist.dto.*;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class CommonPlaylistServiceImpl implements CommonPlaylistService{

    private final WebClient.Builder webClientBuilder;

    private final Map<Long, SseEmitter> SseEmitters = new ConcurrentHashMap<>();

    public CommonPlaylistServiceImpl(WebClient.Builder webClientBuilder){
        this.webClientBuilder = webClientBuilder;
    }


    // 공동 플레이리스트 조회
    public PlaylistResponseDto getIndividualPlaylist(String playlistId) {
        // AuthService 에 Token 요청
        String token = getToken();

        PlaylistResponseDto playlistResponseDto = webClientBuilder.build().get().uri(uriBuilder -> uriBuilder.path("/playlists/"+playlistId).queryParam("fields","description,id,name,images,tracks(items(track(album(images),artists(name),id,name,uri)))").build()).header("Authorization", "Bearer " + token).header("Accept-Language", "ko-KR")
                .retrieve().bodyToMono(PlaylistResponseDto.class).block();

        return playlistResponseDto;
    }

    // 공동 플레이리스트 생성
    public void createPlaylist(PlaylistCreateDto playlistCreateDto) throws ParseException {
        // AuthService 에 Token 요청
        String token = getToken();
        // UserService에 스포티파이 유저 아이디 요청
        String spotifyUserId = getSpotifyUserId();

        String requestBody = "{\"name\": \""+playlistCreateDto.getName()+"\",\"description\":\""+playlistCreateDto.getDescription()+"\",\"public\":"+playlistCreateDto.isOpen()+"}";

        String str2 = webClientBuilder.build().post().uri("/users/{user_id}/playlists",spotifyUserId).header("Authorization", "Bearer " + token)
                .bodyValue(requestBody).retrieve().bodyToMono(String.class).block();

//        JSONParser parser = new JSONParser();
//        JSONObject jsonObject2 = (JSONObject) parser.parse(str2);
//        String playlistId = (String) jsonObject2.get("id");

    }

    // 공동 플레이리스트에 트랙 추가
    public void createTrack(String playlistId, TrackCreateDto trackCreateDto){

        String token = getToken();
        String str = webClientBuilder.build().post().uri("/playlists/{playlist_id}/tracks",playlistId).header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(trackCreateDto)).retrieve().bodyToMono(String.class).block();



    }

    // 공동 플레이리스트 id를 이용해서 친구관계 두명의 id를 받는 요청 => 윤우에게 요청
    public RelationDto getRelationId(String playlistId) {
        RelationDto relationDto = new RelationDto();
        // 예시
        relationDto.setUser1(1234);
        relationDto.setUser2(12345);
        //
        // 윤우에게 요청
        //
        return relationDto;
    }

    // 공동 플레이리스트에 트랙 삭제
    public void deleteTrack(String playlistId, TrackDeleteRequestDto trackDeleteRequestDto){
        String token = getToken();
        String str = webClientBuilder.build().method(HttpMethod.DELETE).uri("/playlists/{playlist_id}/tracks",playlistId).header("Authorization", "Bearer " + token)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).body(BodyInserters.fromValue(trackDeleteRequestDto)).retrieve().bodyToMono(String.class).block();
    }


    // 스포티파이 유저 ID 요청
    private String getSpotifyUserId() {
        return "31nmxiqhjnusfymqkaki3usnsose";
    }

    // 토큰 요청
    private String getToken() {
        return "BQCeOjj0rw8gIidFztwaSwzhhrHR12rshn1VIaf6kSVuiQNOMjuSxl_m7_-vp4VLGCQLho_X-d8wWNVogpCaqPthSqPpYBgUfTh1OMPxmCDEhwkMzsgWMgQd1tMI2DVgsA8W3bxxr6eYwkRV9MdZ2r-x2OB_qY186mT2nQEX2RQ72PJKI0S_Hk7In2bbEQKEL1yY6OHjDjSk06cxJfGyEs57ldwZx63KXHZQ0fPBlA7S72uwghylZgLJHQFSKIh-SL5si78Aw_W6S7ELkJ2_IO4JJ31Tj7oqLSMki30LQ50";
    }
}
