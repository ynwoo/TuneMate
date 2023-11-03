package com.example.tunemateuserservice.config.auth;

import com.example.tunemateuserservice.dto.MemberDto;
import com.example.tunemateuserservice.model.SpotifyToken;
import com.example.tunemateuserservice.repository.SpotifyTokenRepository;
import com.example.tunemateuserservice.service.MemberService;
import com.example.tunemateuserservice.util.JwtTokenUtil;
import com.example.tunemateuserservice.vo.ResponseAuth;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizedClientRepository;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.OAuth2RefreshToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class OAuthSuccessHandler implements AuthenticationSuccessHandler {
    private final MemberService memberService;
    private final SpotifyTokenRepository spotifyTokenRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private final Environment env;
    private final OAuth2AuthorizedClientRepository authorizedClientRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = ((OAuth2User) authentication.getPrincipal());
        String spotifyUserId = oAuth2User.getAttribute("id");

        Optional<MemberDto> optionalMemberDto = memberService.getMemberDetailsBySpotifyUserId(spotifyUserId);

        String userId = optionalMemberDto.isEmpty() ? UUID.randomUUID().toString() : optionalMemberDto.get().getUserId();

        OAuth2AuthenticationToken auth = (OAuth2AuthenticationToken) authentication;
        OAuth2AuthorizedClient authorizedClient = authorizedClientRepository.loadAuthorizedClient(auth.getAuthorizedClientRegistrationId(), authentication, request);

        OAuth2AccessToken oAuth2AccessToken = authorizedClient.getAccessToken();
        OAuth2RefreshToken oAuth2RefreshToken = authorizedClient.getRefreshToken();

        SpotifyToken spotifyToken = SpotifyToken.builder()
                .userId(userId)
                .accessToken(oAuth2AccessToken.getTokenValue())
                .build();

        spotifyTokenRepository.save(spotifyToken);

        String accessToken = jwtTokenUtil.issueAccessToken(userId);
        String refreshToken = jwtTokenUtil.issueRefreshToken(userId);

        List<String> images = (List<String>) oAuth2User.getAttribute("images");
        String imageUrl = images.isEmpty() ? null : images.get(0);

        MemberDto memberDto = MemberDto.builder()
                .userId(userId)
                .name(oAuth2User.getAttribute("display_name"))
                .email(oAuth2User.getAttribute("email"))
                .imageUrl(imageUrl)
                .spotifyUserId(spotifyUserId)
                .spotifyRefreshToken(oAuth2RefreshToken.getTokenValue())
                .refreshToken(refreshToken)
                .build();

        memberService.saveMember(memberDto);

        ObjectMapper objectMapper = new ObjectMapper();
        ResponseAuth responseAuth = ResponseAuth.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .userId(userId)
                .build();
        String result = objectMapper.writeValueAsString(responseAuth);

        response.setHeader("content-type", "application/json");
        response.setCharacterEncoding("utf-8");
        response.getWriter().print(result);
    }
}
