package com.example.tunemateuserservice.service;

import com.example.tunemateuserservice.dto.ReissueDto;
import com.example.tunemateuserservice.exception.InvalidRefreshTokenException;
import com.example.tunemateuserservice.model.Member;
import com.example.tunemateuserservice.repository.MemberRepository;
import com.example.tunemateuserservice.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtTokenServiceImpl implements JwtTokenService {
    private final MemberRepository memberRepository;
    private final JwtTokenUtil jwtTokenUtil;

    @Override
    public ReissueDto reissueAccessToken(String refreshToken) {
        jwtTokenUtil.validateRefreshToken(refreshToken);

        String userId = jwtTokenUtil.getUserId(refreshToken);
        Member member = memberRepository.findByUserId(userId).orElseThrow(() -> new InvalidRefreshTokenException("존재하지 않는 사용자의 리프레시 토큰입니다.", HttpStatus.BAD_REQUEST));

        if (!member.getRefreshToken().equals(refreshToken)) {
            throw new InvalidRefreshTokenException("만료된 리프레시 토큰입니다.", HttpStatus.BAD_REQUEST);
        }

        String accessToken = jwtTokenUtil.issueAccessToken(userId);

        return ReissueDto.builder()
                .accessToken(accessToken)
                .userId(userId)
                .build();
    }
}
