package com.tunemate.tunemateplaylist.service;

import com.tunemate.tunemateplaylist.domain.Playlist;
import com.tunemate.tunemateplaylist.domain.Tracks;
import com.tunemate.tunemateplaylist.dto.*;
import com.tunemate.tunemateplaylist.exception.NotFoundException;
import com.tunemate.tunemateplaylist.repository.TracksRepository;
import io.netty.handler.codec.http.HttpResponseStatus;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
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

    private final TracksRepository tracksRepository;

    public CommonPlaylistServiceImpl(WebClient.Builder webClientBuilder, TracksRepository tracksRepository){
        this.webClientBuilder = webClientBuilder;
        this.tracksRepository = tracksRepository;
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
    public void createTrack(String playlistId, TrackCreateDto trackCreateDto) throws ParseException {

        String token = getToken();
        String strr= webClientBuilder.build().post().uri("/playlists/{playlist_id}/tracks",playlistId).header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(trackCreateDto)).retrieve().bodyToMono(String.class).block();
        String spotifyUri = trackCreateDto.getUris().get(0);
        if(tracksRepository.findBySpotifyUri(spotifyUri).size() != 0){
            throw new NotFoundException("이미 데이터베이스에 있는 노래", HttpStatus.FORBIDDEN);
        }
        String str = webClientBuilder.build().get().uri("/tracks/{id}",spotifyUri.split(":")[2]).header("Authorization", "Bearer " + token).header("Accept-Language", "ko-KR")
                .retrieve().bodyToMono(String.class).block();
        JSONParser parser = new JSONParser();
        JSONObject jsonObject = (JSONObject) parser.parse(str);
        JSONObject jsonObject2 = (JSONObject) jsonObject.get("album");
        List<JSONObject> artists = (List<JSONObject>) jsonObject.get("artists");
        List<JSONObject> jsonObject3 = (List<JSONObject>) jsonObject2.get("images");
        String artist= "";
        for(JSONObject artistOne : artists){
            artist += artistOne.get("name") +",";
        }
        artist = artist.substring(0, artist.length() - 1);
        String image = (String) jsonObject3.get(0).get("url");
        String title = (String) jsonObject.get("name");

        String str2 = webClientBuilder.build().get().uri("/audio-features/{id}",spotifyUri.split(":")[2]).header("Authorization", "Bearer " + token).header("Accept-Language", "ko-KR")
                .retrieve().bodyToMono(String.class).block();
        JSONObject jsonObject5 = (JSONObject) parser.parse(str2);

        double acousticness = (Double) jsonObject5.get("acousticness");
        double danceability = (Double) jsonObject5.get("danceability");
        double tempo = (Double) jsonObject5.get("tempo");
        double energy = (Double) jsonObject5.get("energy");
        Tracks tracks = new Tracks();
        tracks.setAcousticness(acousticness);
        tracks.setArtist(artist);
        tracks.setDanceability(danceability);
        tracks.setEnergy(energy);
        tracks.setTempo(tempo);
        tracks.setTitle(title);
        tracks.setImage(image);
        tracks.setSpotifyUri(trackCreateDto.getUris().get(0));
        tracksRepository.save(tracks);


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

    // 공동 플레이리스트 트랙 순서 변경
    public void changeTrack(String playlistId, TrackChangeRequestDto trackChangeRequestDto){
        String token = getToken();
        webClientBuilder.build().method(HttpMethod.PUT).uri("/playlists/{playlist_id}/tracks",playlistId).header("Authorization", "Bearer " + token)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).body(BodyInserters.fromValue(trackChangeRequestDto)).retrieve().bodyToMono(String.class).block();
    }


    // 스포티파이 유저 ID 요청
    private String getSpotifyUserId() {
        return "31nmxiqhjnusfymqkaki3usnsose";
    }

    // 토큰 요청
    private String getToken() {
        return "BQCG3K7JKvwj4PBEdbe-ITdQ2R6rtnShn_ARw-KbiQw-eLrpGM6oCmrQ6SVGPQc4j7F0MyuqKxjIQ-CzcNG3WsobknSCWvULgdNhn54qKj2ExTs-zzr8b9ZXohDs6Oa8fU90JcjGOgZF_1TUVLuZ9WRq-fdRZANVfwMAkCniPzccEt8_vPH7cacRIctLncXtTX_1rKgyS4_wrSpmRwxMeTm7GoaSEDsT24d6Nyl3c7QMw9V04xTBJiu-gf0sk1UYWBjljBGS6QK0PtCZAW35NvJrZwORf6OqhUwRa-mJjt4";
    }
}
