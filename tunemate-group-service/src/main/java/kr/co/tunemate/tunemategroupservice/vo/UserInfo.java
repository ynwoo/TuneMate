package kr.co.tunemate.tunemategroupservice.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "사용자 정보 VO")
public class UserInfo {
    @Schema(example = "ab1b4b7f-abb2-4bf1-920f-b437233b4f47", description = "사용자 UUID")
    private String userId;
    @Schema(example = "김남고", description = "사용자 이름")
    private String name;
    @Schema(example = "https://wqe.qweasdo/image/ab67757000wqe23821b8b438698448ad", description = "이미지 url")
    private String imageUrl;
}
