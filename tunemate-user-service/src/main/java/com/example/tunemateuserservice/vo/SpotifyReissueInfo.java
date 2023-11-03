package com.example.tunemateuserservice.vo;

import lombok.Data;

@Data
public class SpotifyReissueInfo {
    private String accessToken;
    private String refreshToken;
    private Long expiresIn;
}
