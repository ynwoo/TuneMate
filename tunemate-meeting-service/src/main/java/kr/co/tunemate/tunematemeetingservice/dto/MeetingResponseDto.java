package kr.co.tunemate.tunematemeetingservice.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
public class MeetingResponseDto {

    @Schema(description = "친구 관계의 기본키", example = "3")
    private Long meetingId;
    @Schema(description = "만남 일정 메모", example = "우산 챙겨가기.")
    private String memo;
    @Schema(description = "공연 정보의 기본키", example = "3")
    private Long concertId;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "만남 날짜", example = "2023-12-10 12:20:00")
    private LocalDateTime datetime;
    @Schema(description = "친구 관계의 기본키", example = "2")
    private Long relationId;
}