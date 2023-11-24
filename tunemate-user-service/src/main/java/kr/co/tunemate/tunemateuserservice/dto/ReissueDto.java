package kr.co.tunemate.tunemateuserservice.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ReissueDto {
    private String accessToken;
    private String userId;
}
