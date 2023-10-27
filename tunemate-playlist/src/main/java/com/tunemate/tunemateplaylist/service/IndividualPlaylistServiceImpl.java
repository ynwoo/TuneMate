package com.tunemate.tunemateplaylist.service;

import com.tunemate.tunemateplaylist.domain.Playlist;
import com.tunemate.tunemateplaylist.dto.PlaylistCreateDto;
import com.tunemate.tunemateplaylist.repository.IndividualPlaylistRepository;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class IndividualPlaylistServiceImpl implements IndividualPlaylistService {

    private final WebClient.Builder webClientBuilder;
    private final IndividualPlaylistRepository individualPlaylistRepository;

    public IndividualPlaylistServiceImpl(WebClient.Builder webClientBuilder, IndividualPlaylistRepository individualPlaylistRepository) {
        this.webClientBuilder = webClientBuilder;
        this.individualPlaylistRepository = individualPlaylistRepository;
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


        System.out.println(requestBody);
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

    private String getSpotifyUserId() {
        return "31nmxiqhjnusfymqkaki3usnsose";
    }

    private String getToken() {
        return "BQCddROV9H6BiYMvp3XxCCDokoHcu1QtK2kLOX6y5KyZkx7mC3CQ_7hANjJePjX_wQsGFHyTMtF4f7hXhhy6EluDfMHlWsWo3x8nr3n4sgMgdZ1hxbn4RjJ6W8b21xvMl9St_vSNE5vF-paSJ2-v4UEHknbkhT5QdCLmeNsl0W0seJShD_4t-nqH6ilbOvFl5aFb79ZfjyjLzWh2oAHj7oxBjNVERwMcIVK7c4UerMdvhLcxGL8Bz5HEZdcLh_LHkGEqt8yO-jrkbaCgTVcC4O5zBWYcLw8Is_9sprnF6VA";
    }
}
