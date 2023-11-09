package kr.co.tunemate.tunematemeetingservice.service;

import kr.co.tunemate.tunematemeetingservice.domain.Meeting;
import kr.co.tunemate.tunematemeetingservice.dto.MeetingResponseDto;
import kr.co.tunemate.tunematemeetingservice.repository.MeetingRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class MeetingServiceImpl implements MeetingService{

    private MeetingRepository meetingRepository;
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
    public List<Meeting> getMeetings(long relationId) {

        return meetingRepository.findByRelationId(relationId);
    }
}
