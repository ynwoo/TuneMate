package com.example.tunemateuserservice.service;

public interface JwtTokenService {
    String reissueAccessToken(String refreshToken);
}
