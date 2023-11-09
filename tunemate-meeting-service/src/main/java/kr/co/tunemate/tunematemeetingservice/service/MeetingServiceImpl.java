package kr.co.tunemate.tunematemeetingservice.service;

import kr.co.tunemate.tunematemeetingservice.client.GroupServiceClient;
import kr.co.tunemate.tunematemeetingservice.domain.Meeting;
import kr.co.tunemate.tunematemeetingservice.dto.MeetingResponseDto;
import kr.co.tunemate.tunematemeetingservice.dto.ResponseMeetingList;
import kr.co.tunemate.tunematemeetingservice.repository.MeetingRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class MeetingServiceImpl implements MeetingService{

    private MeetingRepository meetingRepository;
    private GroupServiceClient groupServiceClient;
    @Override
    public void createMeeting(MeetingResponseDto meetingResponseDto) {
        System.out.println(meetingResponseDto.getDatetime());
        Meeting meeting = Meeting.builder()
                .memo(meetingResponseDto.getMemo())
                .relationId(meetingResponseDto.getRelationId())
                .concertId(meetingResponseDto.getConcertId())
                .datetime(meetingResponseDto.getDatetime())
                .build();
        meetingRepository.save(meeting);
    }

    @Override
    public List<ResponseMeetingList> getMeetings(long relationId) {
        List<Meeting> meetings = meetingRepository.findByRelationId(relationId);
        List<ResponseMeetingList> responseMeetingLists = new ArrayList<>();
        for(Meeting meeting : meetings){
            ResponseMeetingList meet = new ResponseMeetingList();
            meet.setMeetingId(meeting.getId());
            meet.setMemo(meeting.getMemo());
            meet.setConcert(groupServiceClient.getConcertInfo(meeting.getConcertId()));
            meet.setDatetime(meeting.getDatetime());
            meet.setRelationId(meeting.getRelationId());
            responseMeetingLists.add(meet);
        }
        return responseMeetingLists;
    }

    @Override
    public void deleteMeeting(long meetingId) {
        meetingRepository.deleteById(meetingId);
    }

    @Override
    public Optional<Meeting> findMeeting(long meetingId){
        return meetingRepository.findById(meetingId);
    }
}
