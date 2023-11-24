package kr.co.tunemate.tunemategroupservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@Schema(description = "공고참여요청 응답 VO")
public class ResponseGroupParticipationRequest {
    @Schema(example = "23cb91d3-78ac-45b0-995a-38f8bd348d12")
    private String groupParticipationRequestId;
    @Schema
    private ResponseGroup responseGroup;
    @Schema
    private UserInfo userInfo;
    private LocalDateTime createdAt;
    private LocalDateTime lastModifiedAt;
}
