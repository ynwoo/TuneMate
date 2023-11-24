package kr.co.tunemate.tunemategroupservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@Schema(description = "공고참여 응답 VO")
public class ResponseGroupParticipation {
    @Schema(example = "23cb91d3-78ac-45b0-995a-38f8bd348d12", description = "공고참여 UUID")
    private String groupParticipationId;
    @Schema
    private ResponseGroup responseGroup;
    @Schema(example = "789ad91d3-78ac-45b0-995a-38f8bd348d12", description = "사용자 UUID")
    private String userId;
    @Schema(description = "공고참여 일시")
    private LocalDateTime createdAt;
    @Schema(description = "공고참여 수정일시")
    private LocalDateTime lastModifiedAt;
}
