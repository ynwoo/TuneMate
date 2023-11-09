package kr.co.tunemate.tunematemeetingservice.service;

import kr.co.tunemate.tunematemeetingservice.dto.MeetingResponseDto;

public interface MeetingService {

    void createMeeting(MeetingResponseDto meetingResponseDto);
}
