package kr.co.tunemate.tunemateuserservice.vo;

import feign.form.FormProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SpotifyReissueRequest {
    @FormProperty("grant_type")
    private String grantType;
    @FormProperty("refresh_token")
    private String refreshToken;
}
