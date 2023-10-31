package com.example.tunemateuserservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseMember {
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
    @Schema(description = "스포티파이 액세스 토큰")
    private String spotifyAccessToken;
}
