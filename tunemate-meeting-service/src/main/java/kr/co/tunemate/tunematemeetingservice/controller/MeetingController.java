package kr.co.tunemate.tunematemeetingservice.controller;


import kr.co.tunemate.tunematemeetingservice.client.SocialServiceClient;
import kr.co.tunemate.tunematemeetingservice.dto.MeetingResponseDto;
import kr.co.tunemate.tunematemeetingservice.service.MeetingService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(value = "*", allowedHeaders = "*")
@RequiredArgsConstructor
@Slf4j

public class MeetingController {

    private final SocialServiceClient socialServiceClient;
    private final MeetingService meetingService;

    @GetMapping("meetings")
    public List<MeetingResponseDto> getMeetings(){
        List<MeetingResponseDto> meetingResponseDtoList = new ArrayList<>();
        MeetingResponseDto meeting1 = new MeetingResponseDto();
        meeting1.setMeetingId(1l);
        meeting1.setMemo("놀러가기");
        meeting1.setDatetime(LocalDateTime.now());
        meeting1.setRelationId(1l);
        meeting1.setConcertId(1l);
        MeetingResponseDto meeting2 = new MeetingResponseDto();
        meeting2.setMeetingId(2l);
        meeting2.setMemo("영화관 가기");
        meeting2.setDatetime(LocalDateTime.now());
        meeting2.setRelationId(2l);
        meeting2.setConcertId(2l);
        meetingResponseDtoList.add(meeting1);
        meetingResponseDtoList.add(meeting2);

        return meetingResponseDtoList;
    }


    @PostMapping("meetings")
    public ResponseEntity createMeeting(@RequestHeader("UserId") String userId, @RequestBody MeetingResponseDto meetingResponseDto){

        if(!socialServiceClient.isExistRelation(meetingResponseDto.getRelationId())){ // relationId 가 없다면
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        meetingService.createMeeting(meetingResponseDto);
        return ResponseEntity.ok(HttpStatus.OK);

    }
}