package com.example.tunemateuserservice.util;

import com.example.tunemateuserservice.exception.InvalidRefreshTokenException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtTokenUtil {
    private final static String refreshTokenSubject = "Refresh Token";
    private final static String userIdClaimKey = "userId";
    private final Environment env;
    private final SecretKey secretKey = Keys.hmacShaKeyFor(Base64.getEncoder().encode(env.getProperty("jwt.private-key").getBytes()));;
    private final Long accessTokenValidMillis = Long.parseLong(env.getProperty("jwt.access-token.expiration-epoch"));
    private final Long refreshTokenValidMillis = Long.parseLong(env.getProperty("jwt.refresh-token.expiration-epoch"));

    /**
     * 리프레시 토큰이 유효한지 아래사항을 검증하여 예외를 던진다.
     * 
     * 1. JWT 토큰 형식이 맞는지 검증
     * 2. 서명을 검증
     * 3. JWT의 subject 값이 "Refresh Token"인지 검증
     * @param refreshToken
     */
    public void validateRefreshToken(String refreshToken) {
        String subject = null;

        try {
            subject = getSubject(refreshToken);
        } catch (Exception ex) {
            log.error(ex.getMessage());
            throw new InvalidRefreshTokenException("유효하지 않은 리프레시 토큰입니다.", HttpStatus.BAD_REQUEST);
        }

        if (subject == null || subject.isEmpty() || subject.equals(refreshTokenSubject)) {
            throw new InvalidRefreshTokenException("유효하지 않은 리프레시 토큰입니다.", HttpStatus.BAD_REQUEST);
        }
    }

    public String issueAccessToken(String userId) {
        return Jwts.builder()
                .subject(userId)
                .expiration(new Date(System.currentTimeMillis() + Long.parseLong(env.getProperty("jwt.access-token.expiration-epoch"))))
                .issuer("tunemate")
                .signWith(secretKey)
                .compact();
    }

    private String getSubject(String jwt) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .build()
                .parseSignedClaims(jwt)
                .getPayload()
                .getSubject();
    }

    public String getUserId(String jwt) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .build()
                .parseSignedClaims(jwt)
                .getPayload()
                .get(userIdClaimKey, String.class);
    }


}