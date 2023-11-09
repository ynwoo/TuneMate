package kr.co.tunemate.tunematemeetingservice.service;

import kr.co.tunemate.tunematemeetingservice.domain.Meeting;
import kr.co.tunemate.tunematemeetingservice.dto.MeetingResponseDto;

import java.util.List;

public interface MeetingService {

    void createMeeting(MeetingResponseDto meetingResponseDto);

    List<Meeting> getMeetings(long relationId);

    void deleteMeeting(long meetingId);
}
