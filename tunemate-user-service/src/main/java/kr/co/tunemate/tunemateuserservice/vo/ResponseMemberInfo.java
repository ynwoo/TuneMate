package kr.co.tunemate.tunemateuserservice.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "사용자 정보 응답 VO")
public class ResponseMemberInfo {
    private String userId;
    private String name;
    private String imageUrl;
}
