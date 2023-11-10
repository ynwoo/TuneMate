package kr.co.tunemate.tunemategroupservice.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import kr.co.tunemate.tunemategroupservice.service.GroupParticipationRequestService;
import kr.co.tunemate.tunemategroupservice.vo.ResponseGroupParticipationRequest;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class GroupParticipationRequestController {
    private final GroupParticipationRequestService groupParticipationRequestService;
    private final ModelMapper modelMapper;

    @Operation(summary = "공고참여요청을 생성", description = "공고참여요청을 생성합니다.")
    @ApiResponses(
            {
                    @ApiResponse(responseCode = "201", description ="성공"),
                    @ApiResponse(responseCode = "400", description = """
                            1. 마감 됐거나 인원이 초과된 경우
                            2. 이미 참여중인 공고인 경우
                            3. 이미 참여요청이 있는 경우
                            """),
                    @ApiResponse(responseCode = "404", description = "존재하지 않는 groupId로 요청 하는 경우")
            }
    )
    @PostMapping("/groups/{groupId}/participation-requests")
    public ResponseEntity postParticipationRequest(@RequestHeader("UserId") String userId, @PathVariable String groupId) {
        groupParticipationRequestService.saveGroupParticipationRequest(userId, groupId);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    
    @Operation(summary = "보낸 공고참여요청 목록 조회", description = "사용자가 보낸 공고참여요청 목록을 조회합니다.")
    @ApiResponses(
            {
                    @ApiResponse(responseCode = "200", description = "성공")
            }
    )
    @GetMapping("/me/sent-participation-requests")
    public ResponseEntity<List<ResponseGroupParticipationRequest>> getMyGroupParticipationRequests(@RequestHeader("UserId") String userId) {
        List<ResponseGroupParticipationRequest> responseGroupParticipationRequests = groupParticipationRequestService.findAllByUserId(userId).stream().map(groupParticipationRequestDto ->
                modelMapper.map(groupParticipationRequestDto, ResponseGroupParticipationRequest.class)
        ).toList();

        return ResponseEntity.ok(responseGroupParticipationRequests);
    }

    @Operation(summary = "공고에 대한 참여요청을 작성자가 수락", description = "공고에 대한 참여요청을 작성자가 수락합니다.")
    @ApiResponses(
            {
                    @ApiResponse(responseCode = "200", description =
                            """
                            성공

                            이미 참여중인 공고에 대한 참여요청인 경우
                            """
                    ),
                    @ApiResponse(responseCode = "403", description = "공고 작성자가 아닌 사용자가 참여요청 수락을 시도하는 경우"),
                    @ApiResponse(responseCode = "404", description = "존재하지 않는 participationId에 대해 요청하는 경우")
            }
    )
    @PostMapping("/group-participation-requests/{groupParticipationRequestId}")
    public ResponseEntity acceptGroupParticipationRequest(@RequestHeader("UserId") String userId, @PathVariable String groupParticipationRequestId) {
        groupParticipationRequestService.acceptGroupParticipationRequest(userId, groupParticipationRequestId);

        return ResponseEntity.ok().build();
    }

    @Operation(summary = "공고에 대한 참여요청을 작성자가 거절", description = "공고에 대한 참여요청을 작성자가 거절합니다.")
    @ApiResponses(
            {
                    @ApiResponse(responseCode = "200", description = "성공"),
                    @ApiResponse(responseCode = "403", description = "공고 작성자가 아닌 사용자가 참여요청 거절을 시도한 경우"),
                    @ApiResponse(responseCode = "404", description = "존재하지 않는 groupParticipationRequestId로 요청하는 경우")
            }
    )
    @DeleteMapping("/group-participation-requests/{groupParticipationRequestId}")
    public ResponseEntity denyGroupParticipationRequest(@RequestHeader("UserId") String userId, @PathVariable String groupParticipationRequestId) {
        groupParticipationRequestService.denyGroupParticipationRequest(userId, groupParticipationRequestId);

        return ResponseEntity.ok().build();
    }
}
