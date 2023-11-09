package kr.co.tunemate.tunematemeetingservice.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
public class MeetingResponseDto {

    private Long meetingId;

    private String memo;

    private Long concertId;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime datetime;

    private Long relationId;
}