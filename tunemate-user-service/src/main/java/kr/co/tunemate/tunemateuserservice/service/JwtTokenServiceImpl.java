package kr.co.tunemate.tunemateuserservice.service;

import kr.co.tunemate.tunemateuserservice.dto.ReissueDto;
import kr.co.tunemate.tunemateuserservice.exception.InvalidRefreshTokenException;
import kr.co.tunemate.tunemateuserservice.model.Member;
import kr.co.tunemate.tunemateuserservice.repository.MemberRepository;
import kr.co.tunemate.tunemateuserservice.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtTokenServiceImpl implements JwtTokenService {
    private final MemberRepository memberRepository;
    private final JwtTokenUtil jwtTokenUtil;

    /**
     * Tunemate 리프레시 토큰을 사용해서 액세스 토큰을 재발급합니다.
     * @param refreshToken tunemate 리프레시 토큰
     * @return
     */
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
