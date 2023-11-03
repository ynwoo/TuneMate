package kr.co.tunemate.tunematemeetingservice.controller;


import kr.co.tunemate.tunematemeetingservice.dto.MeetingResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(value = "*", allowedHeaders = "*")
@RequiredArgsConstructor

@Slf4j

public class MeetingController {

    @GetMapping("meetings")
    public List<MeetingResponseDto> getMeetings(){
        List<MeetingResponseDto> meetingResponseDtoList = new ArrayList<>();
        MeetingResponseDto meeting1 = new MeetingResponseDto();
        meeting1.setMeetingId(1l);
        meeting1.setMemo("놀러가기");
        meeting1.setDateTime(LocalDateTime.now());
        meeting1.setRelationId(1l);
        meeting1.setConcertId(1l);
        MeetingResponseDto meeting2 = new MeetingResponseDto();
        meeting2.setMeetingId(2l);
        meeting2.setMemo("영화관 가기");
        meeting2.setDateTime(LocalDateTime.now());
        meeting2.setRelationId(2l);
        meeting2.setConcertId(2l);
        meetingResponseDtoList.add(meeting1);
        meetingResponseDtoList.add(meeting2);

        return meetingResponseDtoList;
    }
}