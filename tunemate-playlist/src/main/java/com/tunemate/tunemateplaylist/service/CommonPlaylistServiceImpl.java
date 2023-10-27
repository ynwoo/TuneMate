package com.tunemate.tunemateplaylist.service;

import com.tunemate.tunemateplaylist.domain.Playlist;
import com.tunemate.tunemateplaylist.dto.PlaylistCreateDto;
import com.tunemate.tunemateplaylist.dto.PlaylistResponseDto;
import com.tunemate.tunemateplaylist.dto.RelationDto;
import com.tunemate.tunemateplaylist.dto.TrackCreateDto;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
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

    // 공동 플레이리스트 생성
    public void createPlaylist(PlaylistCreateDto playlistCreateDto) throws ParseException {
        // AuthService 에 Token 요청
        String token = getToken();
        // UserService에 스포티파이 유저 아이디 요청
        String spotifyUserId = getSpotifyUserId();

        JSONParser parser = new JSONParser();

        String requestBody = "{\"name\": \""+playlistCreateDto.getName()+"\",\"description\":\""+playlistCreateDto.getDescription()+"\",\"public\":"+playlistCreateDto.isOpen()+"}";

        String str2 = webClientBuilder.build().post().uri("/users/{user_id}/playlists",spotifyUserId).header("Authorization", "Bearer " + token)
                .bodyValue(requestBody).retrieve().bodyToMono(String.class).block();


        JSONObject jsonObject2 = (JSONObject) parser.parse(str2);
        String playlistId = (String) jsonObject2.get("id");
        //
            // 윤우 에게 친구관계 id와 플레이리스트 id 넘겨줘서 저장하고 요청
        //
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


    // 스포티파이 유저 ID 요청
    private String getSpotifyUserId() {
        return "31nmxiqhjnusfymqkaki3usnsose";
    }

    // 토큰 요청
    private String getToken() {
        return "BQC1XJ0gymevTS_cGhhy68uawR77WPEL1PbZjNTjwpBPG_Pa_Vv_Q3KPb93jUHP4P3pnkYC0YGRTTKdEUg2VKh6zb578atuDy_r28PL_jgT3apXByX4c_Jth4bJNB_3jhA8X9ELzpBP13kbMn3VuS2WcLs7Cz_nlXvtlv7you2rY4AirymHf8RgwczeHoEDNN7iMY2PSwLORmDozmoJDD1ND-O6bRe-YymfiC7kKLVa0Pf0Jp3_IfsVVp8Tco0VoSOoTlzuxdMxkBuRNXKeKt0DB0BfZG5KpYEKlfz620Ek";
    }
}
