package kr.co.tunemate.tunematemeetingservice.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ResponseMeetingList {

    private Long meetingId;

    private String memo;

    private ConcertDto concert;

    private LocalDateTime datetime;

    private Long relationId;
}
