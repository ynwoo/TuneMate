package com.example.tunemateuserservice.service;

import com.example.tunemateuserservice.dto.MemberDto;
import com.example.tunemateuserservice.exception.NoSuchItemException;
import com.example.tunemateuserservice.model.Member;
import com.example.tunemateuserservice.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;
    private final ModelMapper mapper;

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

    @Override
    public MemberDto getMemberDetailsByUserId(String userId) {
        Member member = memberRepository.findByUserId(userId).orElseThrow(() -> new NoSuchItemException("사용자 ID가 존재하지 않습니다.", HttpStatus.NOT_FOUND));

        return mapper.map(member, MemberDto.class);
    }
}
