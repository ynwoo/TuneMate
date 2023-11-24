package kr.co.tunemate.tunemateuserservice.service;

import kr.co.tunemate.tunemateuserservice.dto.ReissueDto;

public interface JwtTokenService {
    ReissueDto reissueAccessToken(String refreshToken);
}
