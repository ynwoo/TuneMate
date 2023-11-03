package kr.co.tunemate.tunematemeetingservice.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
public class MeetingResponseDto {

    private Long meetingId;

    private String memo;

    private Long concertId;

    private LocalDateTime dateTime;

    private Long relationId;
}