package kr.co.tunemate.tunemateuserservice.client;

import kr.co.tunemate.tunemateuserservice.vo.SpotifyReissueInfo;
import kr.co.tunemate.tunemateuserservice.vo.SpotifyReissueRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.Map;

@FeignClient(name = "spotify-api", url = "https://accounts.spotify.com")
public interface SpotifyApiClient {
    @PostMapping(path = "/api/token", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public SpotifyReissueInfo reissueSpotifyTokens(@RequestHeader Map<String, String> headers, @RequestBody SpotifyReissueRequest spotifyReissueRequest);
}
