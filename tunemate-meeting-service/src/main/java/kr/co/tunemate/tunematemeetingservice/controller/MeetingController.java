package kr.co.tunemate.tunematemeetingservice.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import kr.co.tunemate.tunematemeetingservice.client.SocialServiceClient;
import kr.co.tunemate.tunematemeetingservice.dto.MeetingResponseDto;
import kr.co.tunemate.tunematemeetingservice.dto.RelationInfo;
import kr.co.tunemate.tunematemeetingservice.dto.ResponseMeetingList;
import kr.co.tunemate.tunematemeetingservice.exception.NotFoundException;
import kr.co.tunemate.tunematemeetingservice.service.MeetingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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

    @GetMapping("meetings/detail/{meetingId}")
    @Operation(summary = "만남 목록 상세 조회", description = "선택 한 친구와 설정한 만남의 상세 정보를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공."),
            @ApiResponse(responseCode = "403", description = "권한이 없습니다."),
            @ApiResponse(responseCode = "404", description = "만남 일정 기본키(meetingId)가 존재하지 않습니다.")

    })
    public ResponseEntity<ResponseMeetingList> getDetailMeetings(@RequestHeader("UserId") String userId, @PathVariable("meetingId") Long meetingId){

        RelationInfo relationInfo = meetingService.findMeeting(meetingId);
        grantCheck(relationInfo,userId);
        ResponseMeetingList responseMeetingList = meetingService.getDetailMeeting(meetingId);
        return ResponseEntity.ok(responseMeetingList);
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

        meetingService.checkValid(userId,meetingId);
        meetingService.deleteMeeting(meetingId);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "만남 일정 수정", description = "선택 한 친구와 설정한 만남을 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "수정 성공."),
            @ApiResponse(responseCode = "403", description = "수정 권한이 없습니다."),
            @ApiResponse(responseCode = "404", description = "meetingId와 일치하는 만남 일정이 존재 하지 않습니다.")

    })
    @PutMapping("meetings/{meetingId}")
    public ResponseEntity changeMeetingInfo(@RequestHeader("UserId") String userId, @PathVariable("meetingId") long meetingId, @RequestBody MeetingResponseDto meetingDto){
        RelationInfo relationInfo = meetingService.findMeeting(meetingId);
        grantCheck(relationInfo,userId);
        meetingService.changeMeetingInfo(meetingDto,userId, meetingId);
        return ResponseEntity.ok().build();
    }

    public void grantCheck(RelationInfo relationInfoDto, String userId){
        if(!relationInfoDto.getUser1Id().equals(userId) && !relationInfoDto.getUser2Id().equals(userId)){
            throw new NotFoundException("권한이 없습니다.", HttpStatus.FORBIDDEN);
        }
    }

}