package kr.co.tunemate.tunemategroupservice.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Schema(description = "공고 요청 VO")
public class RequestGroup {
    @Schema(example = "8c6bbec6-921f-4b03-a2ba-500106abd418", description = "공고 UUID")
    private String groupId;
    @Schema(example = "공고 제목", description = "공고 제목")
    @NotNull
    private String title;
    @Schema(example = "공고 내용", description = "공고 내용")
    @NotNull
    private String content;
    @Schema(example = "4", description = "최대 인원수")
    @NotNull
    private Integer capacity;
    @Schema(description = "마감일시")
    @NotNull
    private LocalDateTime deadline;
    @Schema(example = "52", description = "콘서트 ID")
    @NotNull
    private String concertId;
}
