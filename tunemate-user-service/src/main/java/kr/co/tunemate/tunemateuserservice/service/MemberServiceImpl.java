package kr.co.tunemate.tunemateuserservice.service;

import kr.co.tunemate.tunemateuserservice.client.SpotifyApiClient;
import kr.co.tunemate.tunemateuserservice.dto.MemberDto;
import kr.co.tunemate.tunemateuserservice.exception.NoSuchItemException;
import kr.co.tunemate.tunemateuserservice.model.Member;
import kr.co.tunemate.tunemateuserservice.model.SpotifyToken;
import kr.co.tunemate.tunemateuserservice.repository.MemberRepository;
import kr.co.tunemate.tunemateuserservice.repository.SpotifyTokenRepository;
import kr.co.tunemate.tunemateuserservice.vo.SpotifyReissueInfo;
import kr.co.tunemate.tunemateuserservice.vo.SpotifyReissueRequest;
import org.modelmapper.ModelMapper;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;
    private final SpotifyTokenRepository spotifyTokenRepository;
    private final SpotifyApiClient spotifyApiClient;
    private final ModelMapper mapper;
    private final String refreshRequestAuthorizationValue;

    public MemberServiceImpl(MemberRepository memberRepository, SpotifyTokenRepository spotifyTokenRepository, SpotifyApiClient spotifyApiClient, ModelMapper mapper, Environment env) {
        this.memberRepository = memberRepository;
        this.spotifyTokenRepository = spotifyTokenRepository;
        this.spotifyApiClient = spotifyApiClient;
        this.mapper = mapper;

        String string = env.getProperty("spring.security.oauth2.client.registration.spotify.client-id") + ":" + env.getProperty("spring.security.oauth2.client.registration.spotify.client-secret");
        this.refreshRequestAuthorizationValue = Base64.getEncoder().encodeToString(string.getBytes());
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        return oAuth2User;
    }

    @Override
    public Optional<MemberDto> getMemberDetailsBySpotifyUserId(String spotifyUserId) {
        Optional<Member> optionalMember = memberRepository.findBySpotifyUserId(spotifyUserId);

        if (optionalMember.isEmpty()) {
            return Optional.empty();
        }

        return optionalMember.map(member -> mapper.map(member, MemberDto.class));
    }

    @Transactional
    @Override
    public Member saveMember(MemberDto memberDto) {
        Member resultMember = mapper.map(memberDto, Member.class);

        memberRepository.findBySpotifyUserId(memberDto.getSpotifyUserId()).ifPresentOrElse(
                member -> {
                    mapper.map(memberDto, member);
                    resultMember.setId(member.getId());
                },
                () -> {
                    Member member = mapper.map(memberDto, Member.class);
                    resultMember.setId(memberRepository.save(member).getId());
                });

        return resultMember;
    }

    /**
     * Member Repository 조회와 함께 Redis에 저장된 Spotify Access Token을 조회한다.
     * Spotify Access Token이 만료되어 존재하지 않는 경우, Spotify Refresh Token으로 Spotify Access Token을 재발급 받고 저장하여 응답한다.
     *
     * @param userId
     * @return
     */
    @Transactional
    @Override
    public MemberDto getMemberDetailsByUserId(String userId) {
        Member member = memberRepository.findByUserId(userId).orElseThrow(() -> new NoSuchItemException("사용자 ID가 존재하지 않습니다.", HttpStatus.NOT_FOUND));

        MemberDto memberDto = mapper.map(member, MemberDto.class);
        spotifyTokenRepository.findById(userId)
                .ifPresentOrElse(existingToken -> memberDto.setSpotifyAccessToken(existingToken.getAccessToken()),
                        () -> {
                            SpotifyReissueInfo spotifyReissueInfo = spotifyApiClient.reissueSpotifyTokens(
                                    Map.of(HttpHeaders.AUTHORIZATION, "Basic " + refreshRequestAuthorizationValue,
                                            HttpHeaders.CONTENT_TYPE, "application/x-www-form-urlencoded"),
                                    new SpotifyReissueRequest("refresh_token", memberDto.getSpotifyRefreshToken())
                            );

                            memberDto.setSpotifyAccessToken(spotifyReissueInfo.getAccessToken());

                            String returnRefreshToken = spotifyReissueInfo.getRefreshToken();
                            memberDto.setSpotifyRefreshToken(returnRefreshToken == null ? memberDto.getSpotifyRefreshToken() : returnRefreshToken);

                            mapper.map(memberDto, member);
                            spotifyTokenRepository.save(SpotifyToken.builder()
                                    .userId(userId)
                                    .accessToken(spotifyReissueInfo.getAccessToken())
                                    .build());
                        });

        return memberDto;
    }

    /**
     * userId로 오름차순 정렬한 결과를 반환한다.
     * @param userIds
     * @return
     */
    @Override
    public List<MemberDto> getMembersByUserIdIn(List<String> userIds) {
        return memberRepository.findAllByUserIdInOrderByUserId(userIds).stream().map(member -> mapper.map(member, MemberDto.class)).toList();
    }
}
