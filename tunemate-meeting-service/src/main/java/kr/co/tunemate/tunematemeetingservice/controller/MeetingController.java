package kr.co.tunemate.tunematemeetingservice.controller;


import kr.co.tunemate.tunematemeetingservice.client.SocialServiceClient;
import kr.co.tunemate.tunematemeetingservice.domain.Meeting;
import kr.co.tunemate.tunematemeetingservice.dto.MeetingResponseDto;
import kr.co.tunemate.tunematemeetingservice.dto.RelationInfo;
import kr.co.tunemate.tunematemeetingservice.exception.GlobalExceptionHandler;
import kr.co.tunemate.tunematemeetingservice.exception.NotFoundException;
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
import java.util.NoSuchElementException;

@RestController
@CrossOrigin(value = "*", allowedHeaders = "*")
@RequiredArgsConstructor
@Slf4j

public class MeetingController {

    private final SocialServiceClient socialServiceClient;
    private final MeetingService meetingService;

    @GetMapping("meetings/{relationId}")
    public ResponseEntity<List<Meeting>> getMeetings(@RequestHeader("UserId") String userId, @PathVariable("relationId") long relationId){
        socialServiceClient.isExistRelation(relationId); // relationId 가 없다면 404 에러 발생

        List<Meeting> meetingResponseDtoList = meetingService.getMeetings(relationId);
        return ResponseEntity.ok(meetingResponseDtoList);


    }


    @PostMapping("meetings")
    public ResponseEntity createMeeting(@RequestHeader("UserId") String userId, @RequestBody MeetingResponseDto meetingResponseDto){

        socialServiceClient.isExistRelation(meetingResponseDto.getRelationId()); // relationId 가 없다면 404 에러 발생

        meetingService.createMeeting(meetingResponseDto);
        return ResponseEntity.ok(HttpStatus.OK);

    }

    @DeleteMapping("meetings/{meetingId}")
    public ResponseEntity deleteMeeting(@RequestHeader("UserId") String userId, @PathVariable("meetingId") long meetingId){

        meetingService.findMeeting(meetingId).ifPresentOrElse(meeting -> {
                    RelationInfo relationInfo = socialServiceClient.isExistRelation(meeting.getRelationId());
                    System.out.println(relationInfo.getUser1Id());
                    System.out.println(relationInfo.getUser2Id());
                    if(!relationInfo.getUser1Id().equals(userId) && !relationInfo.getUser2Id().equals(userId)) throw new NotFoundException("삭제 권한이 없습니다.",HttpStatus.FORBIDDEN); // 만남에 참여하지 않은 사람이 삭제하려는 경우 403

                },
                () ->{
                    throw new NotFoundException("meetingId가 존재 하지 않습니다.",HttpStatus.NOT_FOUND); // meetingId가 존재하지 않는 경우 404에러
                });
        meetingService.deleteMeeting(meetingId);
        return ResponseEntity.ok().build();
    }
}