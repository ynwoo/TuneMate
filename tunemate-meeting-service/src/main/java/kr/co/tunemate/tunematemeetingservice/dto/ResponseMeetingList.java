package kr.co.tunemate.tunematemeetingservice.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ResponseMeetingList {

    @Schema(description = "만남 일정의 기본키", example = "1")
    private Long meetingId;
    @Schema(description = "만남 일정 메모", example = "우산 챙겨가기.")
    private String memo;
    @Schema(description = "공연 정보")
    private ConcertDto concert;
    @Schema(description = "만남 날짜", example = "2023-12-10T12:20:00")
    private LocalDateTime datetime;
    @Schema(description = "친구 관계의 기본키", example = "2")
    private Long relationId;
}
