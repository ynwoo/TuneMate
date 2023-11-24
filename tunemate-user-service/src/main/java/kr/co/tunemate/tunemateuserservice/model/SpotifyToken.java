package kr.co.tunemate.tunemateuserservice.model;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

/**
 * 1시간 유효한 스포티파이 액세스 토큰을 55분간 Redis에 저장한다.
 */
@RedisHash(value = "SpotifyToken", timeToLive = 3300)
@Builder
@Getter
public class SpotifyToken {
    @Id
    private String userId;
    private String accessToken;
}
