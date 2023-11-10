package kr.co.tunemate.tunematemeetingservice.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import kr.co.tunemate.tunematemeetingservice.client.SocialServiceClient;
import kr.co.tunemate.tunematemeetingservice.domain.Meeting;
import kr.co.tunemate.tunematemeetingservice.dto.MeetingResponseDto;
import kr.co.tunemate.tunematemeetingservice.dto.RelationInfo;
import kr.co.tunemate.tunematemeetingservice.dto.ResponseMeetingList;
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
    @Operation(summary = "만남 목록 조회", description = "선택 한 친구와 설정한 만남 목록을 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공."),
            @ApiResponse(responseCode = "403", description = "권한이 없습니다."),
            @ApiResponse(responseCode = "404", description = "친구 관계(relationId)가 존재하지 않습니다.")

    })
    public ResponseEntity<List<ResponseMeetingList>> getMeetings(@RequestHeader("UserId") String userId, @PathVariable("relationId") long relationId){
        RelationInfo relationInfo = socialServiceClient.isExistRelation(relationId); // relationId 가 없다면 404 에러 발생
        grantCheck(relationInfo,userId);
        List<ResponseMeetingList> meetingResponseDtoList = meetingService.getMeetings(relationId);
        return ResponseEntity.ok(meetingResponseDtoList);


    }


    @Operation(summary = "만남 일정 생성", description = "선택 한 친구와 만남을 생성합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "만남 생성 성공."),
            @ApiResponse(responseCode = "403", description = "권한이 없습니다."),
            @ApiResponse(responseCode = "404", description = "친구 관계(relationId)가 존재하지 않습니다.")

    })
    @PostMapping("meetings")
    public ResponseEntity createMeeting(@RequestHeader("UserId") String userId, @RequestBody MeetingResponseDto meetingResponseDto){

        RelationInfo relationInfo = socialServiceClient.isExistRelation(meetingResponseDto.getRelationId()); // relationId 가 없다면 404 에러 발생
        grantCheck(relationInfo, userId);
        meetingService.createMeeting(meetingResponseDto);
        return ResponseEntity.ok(HttpStatus.OK);

    }

    @Operation(summary = "만남 일정 삭제", description = "선택 한 친구와 설정한 만남을 삭제합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공."),
            @ApiResponse(responseCode = "403", description = "삭제 권한이 없습니다."),
            @ApiResponse(responseCode = "404", description = "meetingId가 존재 하지 않습니다.")

    })
    @DeleteMapping("meetings/{meetingId}")
    public ResponseEntity deleteMeeting(@RequestHeader("UserId") String userId, @PathVariable("meetingId") long meetingId){

        meetingService.findMeeting(meetingId).ifPresentOrElse(meeting -> {
                    RelationInfo relationInfo = socialServiceClient.isExistRelation(meeting.getRelationId());
                    if(!relationInfo.getUser1Id().equals(userId) && !relationInfo.getUser2Id().equals(userId)) throw new NotFoundException("삭제 권한이 없습니다.",HttpStatus.FORBIDDEN); // 만남에 참여하지 않은 사람이 삭제하려는 경우 403

                },
                () ->{
                    throw new NotFoundException("meetingId가 존재 하지 않습니다.",HttpStatus.NOT_FOUND); // meetingId가 존재하지 않는 경우 404에러
                });
        meetingService.deleteMeeting(meetingId);
        return ResponseEntity.ok().build();
    }

    public void grantCheck(RelationInfo relationInfoDto, String userId){
        if(!relationInfoDto.getUser1Id().equals(userId) && !relationInfoDto.getUser2Id().equals(userId)){
            throw new NotFoundException("권한이 없습니다.", HttpStatus.FORBIDDEN);
        }
    }

}