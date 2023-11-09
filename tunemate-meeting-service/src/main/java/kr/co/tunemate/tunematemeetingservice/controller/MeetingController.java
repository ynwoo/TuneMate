package kr.co.tunemate.tunematemeetingservice.controller;


import kr.co.tunemate.tunematemeetingservice.client.SocialServiceClient;
import kr.co.tunemate.tunematemeetingservice.domain.Meeting;
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

    @GetMapping("meetings/{relationId}")
    public ResponseEntity<List<Meeting>> getMeetings(@RequestHeader("UserId") String userId, @PathVariable("relationId") long relationId){
        if(!socialServiceClient.isExistRelation(relationId)){ // relationId 가 없다면
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        List<Meeting> meetingResponseDtoList = meetingService.getMeetings(relationId);
        return ResponseEntity.ok(meetingResponseDtoList);


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