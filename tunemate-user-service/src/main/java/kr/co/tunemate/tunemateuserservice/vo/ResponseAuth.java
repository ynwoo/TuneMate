package kr.co.tunemate.tunemateuserservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@Schema(description = "인증 응답 VO")
public class ResponseAuth {
    @Schema(description = "Tunemate 액세스 토큰", example = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIwMGFmNGVjYS05NzIxLTRkZWYtOGFlMC0qwe2jMmJjYTk1hjwe12TjE2OTg4MDc2NTAsImlzcyI6InR1bmVtYXRlIn0.9XpsthFyGHr0k8ax2o0L-nyjwKpRKY-BJUbFfIruA7h1ahcSYgrqmCZ1OIcQmjsc")
    private String accessToken;
    @Schema(description = "Tunemate 리프레시 토큰", example = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIwMGFmNGVjYS05NzIxLTRkZWYtOGFlMC0qwe2jMmJjYTk1Zsdfqw721ssfdfI6InR1bmVtYXRlIn0.9XpsthFyGHr0k8ax2o0L-nyjwKpRKY-BJUbFfIruA7h1ahcSYgrqmCZkdqweqwez1")
    private String refreshToken;
    @Schema(description = "사용자 UUID", example = "23cb91d3-78ac-45b0-995a-38f8bd348d12")
    private String userId;
}
