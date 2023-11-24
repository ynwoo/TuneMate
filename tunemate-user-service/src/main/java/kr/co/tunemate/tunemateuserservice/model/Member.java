package kr.co.tunemate.tunemateuserservice.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "기본키")
    private Long id;
    @Schema(description = "API용 사용자 ID")
    @Column(nullable = false, unique = true)
    private String userId;
    @Schema(description = "스포티파이 display_name")
    @Column(nullable = false)
    private String name;
    @Schema(description = "이메일")
    @Column(nullable = false, unique = true)
    private String email;
    @Schema(description = "이미지 URL")
    private String imageUrl;
    @Schema(description = "스포티파이 유저 아이디")
    @Column(nullable = false, unique = true)
    private String spotifyUserId;
    @Schema(description = "Tunemate 리프레시 토큰")
    @Column(nullable = false)
    private String refreshToken;
    @Schema(description = "스포티파이 리프레시 토큰")
    @Column(nullable = false, length = 512)
    private String spotifyRefreshToken;

    @Builder
    public Member(String userId, String name, String email, String imageUrl, String spotifyUserId, String refreshToken, String spotifyRefreshToken) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.imageUrl = imageUrl;
        this.spotifyUserId = spotifyUserId;
        this.refreshToken = refreshToken;
        this.spotifyRefreshToken = spotifyRefreshToken;
    }
}
