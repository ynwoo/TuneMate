package com.example.tunemateuserservice.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class MemberDto {
    @Schema(description = "API용 사용자 ID")
    @Column(nullable = false, unique = true)
    private String userId;
    @Schema(description = "스포티파이 display_name")
    @Column(nullable = false)
    private String name;
    @Schema(description = "이메일")
    @Column(nullable = false, unique = true)
    private String email;
    @Schema(description = "이미지 URL")
    private String imageUrl;
    @Schema(description = "스포티파이 유저 아이디")
    @Column(nullable = false, unique = true)
    private String spotifyUserId;
    @Schema(description = "Tunemate 리프레시 토큰")
    @Column(nullable = false)
    private String refreshToken;
    @Schema(description = "스포티파이 액세스 토큰")
    @Column(nullable = false)
    private String spotifyAccessToken;
    @Schema(description = "스포티파이 리프레시 토큰")
    @Column(nullable = false)
    private String spotifyRefreshToken;
}
