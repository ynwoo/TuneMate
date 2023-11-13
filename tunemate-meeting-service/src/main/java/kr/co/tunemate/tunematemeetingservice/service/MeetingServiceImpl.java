package kr.co.tunemate.tunematemeetingservice.service;

import kr.co.tunemate.tunematemeetingservice.client.GroupServiceClient;
import kr.co.tunemate.tunematemeetingservice.client.SocialServiceClient;
import kr.co.tunemate.tunematemeetingservice.domain.Meeting;
import kr.co.tunemate.tunematemeetingservice.dto.MeetingResponseDto;
import kr.co.tunemate.tunematemeetingservice.dto.RelationInfo;
import kr.co.tunemate.tunematemeetingservice.dto.ResponseMeetingList;
import kr.co.tunemate.tunematemeetingservice.exception.NotFoundException;
import kr.co.tunemate.tunematemeetingservice.repository.MeetingRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class MeetingServiceImpl implements MeetingService{

    private MeetingRepository meetingRepository;
    private GroupServiceClient groupServiceClient;
    private  SocialServiceClient socialServiceClient;
    @Override
    public void createMeeting(MeetingResponseDto meetingResponseDto) {
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
    public RelationInfo findMeeting(long meetingId){

        Optional<Meeting> meeting =  meetingRepository.findById(meetingId);
        if(meeting.isEmpty()) throw new NotFoundException("만남 일정 기본키(meetingId)가 존재하지 않습니다.", HttpStatus.NOT_FOUND);
        return socialServiceClient.isExistRelation(meeting.get().getRelationId());
    }

    @Override
    public ResponseMeetingList getDetailMeeting(long meetingId) {
        Meeting meeting =  meetingRepository.findById(meetingId).get();
        ResponseMeetingList responseMeetingList = new ResponseMeetingList();
        responseMeetingList.setMeetingId(meeting.getId());
        responseMeetingList.setMemo(meeting.getMemo());
        responseMeetingList.setConcert(groupServiceClient.getConcertInfo(meeting.getConcertId()));
        responseMeetingList.setDatetime(meeting.getDatetime());
        responseMeetingList.setRelationId(meeting.getRelationId());
        return responseMeetingList;
    }

    @Override
    public void checkValid(String userId, Long meetingId){
        Optional<Meeting> meeting1 = meetingRepository.findById(meetingId);
        meeting1.ifPresentOrElse(meeting -> {
                    RelationInfo relationInfo = socialServiceClient.isExistRelation(meeting.getRelationId());
                    if(!relationInfo.getUser1Id().equals(userId) && !relationInfo.getUser2Id().equals(userId)) throw new NotFoundException("삭제 권한이 없습니다.",HttpStatus.FORBIDDEN); // 만남에 참여하지 않은 사람이 삭제하려는 경우 403

                },
                () ->{
                    throw new NotFoundException("meetingId가 존재 하지 않습니다.",HttpStatus.NOT_FOUND); // meetingId가 존재하지 않는 경우 404에러
                });
    }

    @Override
    @Transactional
    public void changeMeetingInfo(MeetingResponseDto newMeeting, String userId, Long meetingId) {
        Optional<Meeting> meeting = meetingRepository.findById(meetingId);
        if(meeting.isEmpty()){
            throw new NotFoundException("meetingId에 해당 하는 미팅 정보가 없습니다", HttpStatus.NOT_FOUND);
        }
        Meeting m = meeting.get();
        m.setMemo(newMeeting.getMemo());
        m.setConcertId(newMeeting.getConcertId());
        m.setDatetime(newMeeting.getDatetime());


    }
}
