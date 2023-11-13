package kr.co.tunemate.tunematemeetingservice.service;


import kr.co.tunemate.tunematemeetingservice.dto.MeetingResponseDto;
import kr.co.tunemate.tunematemeetingservice.dto.RelationInfo;
import kr.co.tunemate.tunematemeetingservice.dto.ResponseMeetingList;

import java.util.List;


public interface MeetingService {

    void createMeeting(MeetingResponseDto meetingResponseDto);

    List<ResponseMeetingList> getMeetings(long relationId);

    void deleteMeeting(long meetingId);

    RelationInfo findMeeting(long meetingId);

    ResponseMeetingList getDetailMeeting(long meetingId);

    void changeMeetingInfo(MeetingResponseDto newMeeting, String userId, Long meetingId);


    void checkValid(String userId, Long meetingId);
}
