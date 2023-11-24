package kr.co.tunemate.tunemateuserservice.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemberDto {
    @Schema(description = "API용 사용자 ID")
    private String userId;
    @Schema(description = "스포티파이 display_name")
    private String name;
    @Schema(description = "이메일")
    private String email;
    @Schema(description = "이미지 URL")
    private String imageUrl;
    @Schema(description = "스포티파이 유저 아이디")
    private String spotifyUserId;
    @Schema(description = "Tunemate 리프레시 토큰")
    private String refreshToken;
    @Schema(description = "스포티파이 액세스 토큰")
    private String spotifyAccessToken;
    @Schema(description = "스포티파이 리프레시 토큰")
    private String spotifyRefreshToken;

    @Builder
    public MemberDto(String userId, String name, String email, String imageUrl, String spotifyUserId, String refreshToken, String spotifyAccessToken, String spotifyRefreshToken) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.imageUrl = imageUrl;
        this.spotifyUserId = spotifyUserId;
        this.refreshToken = refreshToken;
        this.spotifyAccessToken = spotifyAccessToken;
        this.spotifyRefreshToken = spotifyRefreshToken;
    }
}
