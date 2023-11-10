package kr.co.tunemate.tunemategroupservice.controller;

import kr.co.tunemate.tunemategroupservice.service.GroupParticipationRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/groups")
@RequiredArgsConstructor
public class GroupParticipationRequestController {
    private final GroupParticipationRequestService groupParticipationRequestService;

    @PostMapping("/{groupId}/participation-request")
    public ResponseEntity postParticipationRequest(@RequestHeader("UserId") String userId, @PathVariable String groupId) {
        groupParticipationRequestService.saveGroupParticipationRequest(userId, groupId);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
