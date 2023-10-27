package com.tunemate.tunemateplaylist.service;

import com.tunemate.tunemateplaylist.domain.Playlist;
import com.tunemate.tunemateplaylist.domain.Track;
import com.tunemate.tunemateplaylist.dto.PlaylistCreateDto;
import com.tunemate.tunemateplaylist.dto.PlaylistResponseDto;
import com.tunemate.tunemateplaylist.dto.TrackCreateDto;
import com.tunemate.tunemateplaylist.repository.IndividualPlaylistRepository;
import com.tunemate.tunemateplaylist.repository.IndividualPlaylistTrackRepository;
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
        long startTime2 = System.currentTimeMillis();  // 시작시간 측정
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
        long endTime2 = System.currentTimeMillis();  // 완료시간 측정
        System.out.println((double) (endTime2 - startTime2) / 1000 + " 초");
    }

    // 개인 플레이리스트 노래 추가
    public void createTrack(long userId, TrackCreateDto trackCreateDto){
        // AuthService 에 Token 요청
        String token = getToken();
        individualPlaylistRepository.findByUserId(userId).ifPresentOrElse(
                playlist -> {
                    String str = webClientBuilder.build().post().uri("/playlists/{playlist_id}/tracks",playlist.getPlaylistSpotifyId()).header("Authorization", "Bearer " + token)
                            .contentType(MediaType.APPLICATION_JSON)
                            .body(BodyInserters.fromValue(trackCreateDto)).retrieve().bodyToMono(String.class).block();

                    JSONParser parser = new JSONParser();
                    System.out.println(playlist.getId());
                    try {
                        JSONObject jsonObject = (JSONObject) parser.parse(str);
                        Track track = new Track();
                        track.setPlaylist(playlist);
                        track.setTrackSpotifyId(trackCreateDto.getUris().get(0));
                        track.setSnapshotId((String) jsonObject.get("snapshot_id"));
                        individualPlaylistTrackRepository.save(track);
                    } catch (ParseException e) {
                        e.printStackTrace();
                    }
                },
                () -> {
                }
        );

    }

    //  개인 대표 플레이리스트 조회
    public PlaylistResponseDto getIndividualPlaylist(long userId) throws ParseException {
        // AuthService 에 Token 요청
        String token = getToken();

        Playlist playlist = individualPlaylistRepository.findByUserId(userId).orElseGet(null);
        if(playlist == null) return null;
        String playlistId = playlist.getPlaylistSpotifyId();

        PlaylistResponseDto playlistResponseDto = webClientBuilder.build().get().uri(uriBuilder -> uriBuilder.path("/playlists/"+playlistId).queryParam("fields","description,id,name,images,snapshot_id,tracks(items(track(album(images),artists(name),id,name,uri)))").build()).header("Authorization", "Bearer " + token)
                .retrieve().bodyToMono(PlaylistResponseDto.class).block();

        return playlistResponseDto;
    }

    private String getSpotifyUserId() {
        return "31nmxiqhjnusfymqkaki3usnsose";
    }

    private String getToken() {
        return "BQCtqloyZRF-NJz821o-auZ37h300dTQd8dwlbL2IMpAjdfcD8KbVR-V45PvFNJZNIAOAZTcgdSjKqn6EODg97dPE3L1zliSGhLYLoJ6kW_-CPJOISoHJqfUAMM1SecMRFodHoM5213Db41xhE6zy4nIfVY59AN4w431kzGT2O7jy2DgScM_O_-aP6HL6c8ixWeWtuaqZaCNlPel2Rxf7ZPug4zF_N8oaeJDBZI7UsZzrM3AM1V4g5bSIBhd0w1UCoXmQvMiNF5ucs3MpZoyT2JepWy6yZkIkt-bIrJmvGA";
    }
}
