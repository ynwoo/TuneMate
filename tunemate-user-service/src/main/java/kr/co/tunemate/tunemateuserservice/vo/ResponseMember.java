package kr.co.tunemate.tunemateuserservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@Schema(description = "사용자 응답 VO")
public class ResponseMember {
    @Schema(description = "API용 사용자 ID", example = "23cb91d3-78ac-45b0-995a-38f8bd348d23")
    private String userId;
    @Schema(description = "스포티파이 display_name", example = "김남고")
    private String name;
    @Schema(description = "이메일", example = "johndoh@example.com")
    private String email;
    @Schema(description = "이미지 URL", example = "image://rlladfjewrafer.adf")
    private String imageUrl;
    @Schema(description = "스포티파이 유저 아이디", example = "310adfwe123yew")
    private String spotifyUserId;
    @Schema(description = "스포티파이 액세스 토큰", example = "BQA9EapyTgqdVtxFb6l19IPex__Q-sABrOXxCsMt0Gdg9LTOKlRQ1b5UPVuLi-iDbuR7MSPxPi_VyE3gLlP6PjtuT3ZMxfA_Yidjh21e12dhhertwtU_Z5-Uv8BEiVOGbvoi-KYTWNx_y96Im01V2YG7gKUThphL5zRawqjFR1qIJBmOBFsjW5Pepu8dMhyyl_vqwehwqe9he8hD4X-y5Oa1n29k0FsoxzZb_hqweSwdf2o")
    private String spotifyAccessToken;
}
