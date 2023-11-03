package com.example.tunemateuserservice.service;

import com.example.tunemateuserservice.dto.ReissueDto;

public interface JwtTokenService {
    ReissueDto reissueAccessToken(String refreshToken);
}
