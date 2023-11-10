package kr.co.tunemate.tunemategroupservice.controller;

import io.swagger.v3.oas.annotations.Operation;
import kr.co.tunemate.tunemategroupservice.service.GroupParticipationRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class GroupParticipationRequestController {
    private final GroupParticipationRequestService groupParticipationRequestService;

    @Operation(description = "공고참여요청을 생성합니다.")
    @PostMapping("/groups/{groupId}/participation-requests")
    public ResponseEntity postParticipationRequest(@RequestHeader("UserId") String userId, @PathVariable String groupId) {
        groupParticipationRequestService.saveGroupParticipationRequest(userId, groupId);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(description = "공고에 대한 참여요청을 작성자가 수락합니다.")
    @PostMapping("/group-participation-requests/{groupParticipationRequestId}")
    public ResponseEntity acceptGroupParticipationRequest(@RequestHeader("UserId") String userId, @PathVariable String groupParticipationRequestId) {
        groupParticipationRequestService.acceptGroupParticipationRequest(userId, groupParticipationRequestId);

        return ResponseEntity.ok().build();
    }

    @Operation(description = "공고에 대한 참여요청을 작성자가 거절합니다.")
    @DeleteMapping("/group-participation-requests/{groupParticipationRequestId}")
    public ResponseEntity denyGroupParticipationRequest(@RequestHeader("UserId") String userId, @PathVariable String groupParticipationRequestId) {
        groupParticipationRequestService.denyGroupParticipationRequest(userId, groupParticipationRequestId);

        return ResponseEntity.ok().build();
    }
}
