package com.tunemate.tunemateplaylist.service;

import com.tunemate.tunemateplaylist.domain.Playlist;
import com.tunemate.tunemateplaylist.domain.Track;
import com.tunemate.tunemateplaylist.dto.*;
import com.tunemate.tunemateplaylist.exception.BaseException;
import com.tunemate.tunemateplaylist.exception.NotFoundException;
import com.tunemate.tunemateplaylist.repository.IndividualPlaylistRepository;
import com.tunemate.tunemateplaylist.repository.IndividualPlaylistTrackRepository;
import io.netty.handler.codec.http.HttpResponseStatus;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import javax.swing.*;

@Service
public class IndividualPlaylistServiceImpl implements IndividualPlaylistService {

    private final WebClient.Builder webClientBuilder;
    private final IndividualPlaylistRepository individualPlaylistRepository;
    private final IndividualPlaylistTrackRepository individualPlaylistTrackRepository;

    public IndividualPlaylistServiceImpl(WebClient.Builder webClientBuilder, IndividualPlaylistRepository individualPlaylistRepository, IndividualPlaylistTrackRepository individualPlaylistTrackRepository) {
        this.webClientBuilder = webClientBuilder;
        this.individualPlaylistRepository = individualPlaylistRepository;
        this.individualPlaylistTrackRepository = individualPlaylistTrackRepository;
    }

    // 개인 플레이리스트 생성
    @Transactional
    public void createPlaylist(long userId, PlaylistCreateDto playlistCreateDto) throws ParseException {

        // AuthService 에 Token 요청
        String token = getToken();
        // UserService에 스포티파이 유저 아이디 요청
        String spotifyUserId = getSpotifyUserId();

        JSONParser parser = new JSONParser();

        String requestBody = "{\"name\": \""+playlistCreateDto.getName()+"\",\"description\":\""+playlistCreateDto.getDescription()+"\",\"public\":"+playlistCreateDto.isOpen()+"}";

        String str2 = webClientBuilder.build().post().uri("/users/{user_id}/playlists",spotifyUserId).header("Authorization", "Bearer " + token)
                .bodyValue(requestBody).retrieve().bodyToMono(String.class).block();


        JSONObject jsonObject2 = (JSONObject) parser.parse(str2);

        individualPlaylistRepository.findByUserId(userId).ifPresentOrElse(
            playlist -> playlist.setPlaylistSpotifyId((String)jsonObject2.get("id")),
            () -> {
                Playlist playlist = new Playlist();
                playlist.setPlaylistSpotifyId((String)jsonObject2.get("id"));
                playlist.setUserId(userId);
                individualPlaylistRepository.save(playlist);
            }
        );

    }

    // 개인 플레이리스트 노래 추가
    public void createTrack(long userId, TrackCreateDto trackCreateDto){
        // AuthService 에 Token 요청
        String token = getToken();
        Playlist playlist = individualPlaylistRepository.findByUserId(userId).orElseThrow(() -> new NotFoundException("에러에러", HttpResponseStatus.NOT_FOUND));
        individualPlaylistTrackRepository.findByTrackSpotifyIdAndPlaylist(trackCreateDto.getUris().get(0),playlist).ifPresentOrElse(track -> {throw new NotFoundException("dfsdf",HttpResponseStatus.FORBIDDEN);},() -> {
            String str = webClientBuilder.build().post().uri("/playlists/{playlist_id}/tracks",playlist.getPlaylistSpotifyId()).header("Authorization", "Bearer " + token)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(BodyInserters.fromValue(trackCreateDto)).retrieve().bodyToMono(String.class).block();
            Track track = new Track();
            track.setPlaylist(playlist);
            track.setTrackSpotifyId(trackCreateDto.getUris().get(0));
            individualPlaylistTrackRepository.save(track);
        });



    }

    //  개인 대표 플레이리스트 조회
    public PlaylistResponseDto getIndividualPlaylist(long userId) throws ParseException {
        // AuthService 에 Token 요청
        String token = getToken();

        Playlist playlist = individualPlaylistRepository.findByUserId(userId).orElseGet(null);
        if(playlist == null) return null;
        String playlistId = playlist.getPlaylistSpotifyId();

        PlaylistResponseDto playlistResponseDto = webClientBuilder.build().get().uri(uriBuilder -> uriBuilder.path("/playlists/"+playlistId).queryParam("fields","description,id,name,images,tracks(items(track(album(images),artists(name),id,name,uri)))").build()).header("Authorization", "Bearer " + token)
                .retrieve().bodyToMono(PlaylistResponseDto.class).block();

        return playlistResponseDto;
    }

    // 대표 플레이리스트로 설정(변경)
    @Transactional
    public void setIndividualPlaylistId(long userId, PlaylistIdDto playlistIdDto){

        String token = getToken();
        String playlistId = playlistIdDto.getPlaylistId();
        Playlist playlist = individualPlaylistRepository.findByUserId(userId).orElseThrow(() -> new NotFoundException("에러에러", HttpResponseStatus.NOT_FOUND));
        playlist.setPlaylistSpotifyId(playlistId);

        individualPlaylistTrackRepository.deleteAll();

        PlaylistResponseDto playlistResponseDto = webClientBuilder.build().get().uri(uriBuilder -> uriBuilder.path("/playlists/"+playlistId).queryParam("fields","description,id,name,images,tracks(items(track(album(images),artists(name),id,name,uri)))").build()).header("Authorization", "Bearer " + token)
                .retrieve().bodyToMono(PlaylistResponseDto.class).block();
        for(ItemsDto itemsDto: playlistResponseDto.getTracks().getItems()){
            Track track = new Track();
            track.setTrackSpotifyId(itemsDto.getTrack().getUri());
            track.setPlaylist(playlist);
            individualPlaylistTrackRepository.save(track);
        }

    }


    // 재생 횟수 카운트
    @Transactional
    public void counting(long userId) throws ParseException {
        String token = getToken();
        String str = webClientBuilder.build().get().uri("/me/player/currently-playing").header("Authorization", "Bearer " + token)
                .retrieve().bodyToMono(String.class).block();
        JSONParser parser = new JSONParser();
        JSONObject jsonObject = (JSONObject) parser.parse(str);
        JSONObject jsonObject2 = (JSONObject) jsonObject.get("item");
        String uri = (String) jsonObject2.get("uri");

        Playlist playlist = individualPlaylistRepository.findByUserId(userId).orElseThrow(() -> new NotFoundException("에러에러", HttpResponseStatus.NOT_FOUND));

        Track track = individualPlaylistTrackRepository.findByTrackSpotifyIdAndPlaylist(uri,playlist).orElseThrow(() -> new NotFoundException("에러에러", HttpResponseStatus.NOT_FOUND));
        track.setCount(track.getCount()+1);
    }

    private String getSpotifyUserId() {
        return "31nmxiqhjnusfymqkaki3usnsose";
    }

    private String getToken() {
        return "BQA6O45hIGiw21G5wmuE41pUkBF5YFtCssVyFwKtqQicorP7M8HjRLd_i2h9j7N7eZ4XEvONOWMCMDTawJPGcu--JpqqPrM1xKBilBlPFDLTYpN6IWU5L4sIdvaBJvh7m0-hdiYuDE4IouO1b84YJYphS8zBibe0Kx-947YEgLbUOdIbjq3YfkKETwpAdCjSQyX05n4KS5dMIAXeLYjKU4burRfetQrZE5QO-2nAfC7Wy35D0oKnx7tpR1qSAS9l4O-65ajdVgWDr6cn3A4-Zf0grsHyy1KD2FQFMRGgeEU";
    }
}
