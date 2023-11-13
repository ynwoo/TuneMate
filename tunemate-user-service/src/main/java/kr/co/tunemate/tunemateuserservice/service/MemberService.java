package kr.co.tunemate.tunemateuserservice.service;

import kr.co.tunemate.tunemateuserservice.dto.MemberDto;
import kr.co.tunemate.tunemateuserservice.model.Member;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.List;
import java.util.Optional;

public interface MemberService extends OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    Optional<MemberDto> getMemberDetailsBySpotifyUserId(String spotifyUserId);
    Member saveMember(MemberDto memberDto);
    MemberDto getMemberDetailsByUserId(String userId);
    List<MemberDto> getMembersByUserIdIn(List<String> userIds);
}
