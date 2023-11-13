package kr.co.tunemate.tunemategroupservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@Schema(description = "공고 응답 VO")
public class ResponseGroup {
    @Schema(example = "123adwd3-78ac-45b0-995a-38f8bd348d12", description = "공고 UUID")
    private String groupId;
    @Schema(example = "7908dgf4-78ac-45b0-995a-38f8bd348d12", description = "작성자 UUID")
    private String hostId;
    @Schema(example = "김남고", description = "작성자 이름")
    private String hostName;
    @Schema(example = "공고 제목", description = "공고 제목")
    private String title;
    @Schema(example = "4", description = "공고 최대 인원수")
    private Integer capacity;
    @Schema(example = "2", description = "현재 공고에 참여중인 인원수")
    private Integer participantsCnt;
    @Schema(example = "52", description = "콘서트 ID")
    private String concertId;
    @Schema(description = "공고 작성일시")
    private LocalDateTime startDateTime;
    @Schema(description = "공고 마감일시")
    private LocalDateTime deadline;
    @Schema(example = "공고 내용", description = "공고 내용")
    private String content;
    @Schema(example = "false", description = "공고 작성자에 의해 공고가 마감이 됐는지 여부를 표현")
    private Boolean closedByHost;
    private LocalDateTime createdAt;
    private LocalDateTime lastModifiedAt;
}
