package kr.co.tunemate.tunemategroupservice.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import kr.co.tunemate.tunemategroupservice.service.GroupParticipationService;
import kr.co.tunemate.tunemategroupservice.vo.ResponseGroupParticipation;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class GroupParticipationController {
    private final GroupParticipationService groupParticipationService;
    private final ModelMapper modelMapper;

    @Operation(summary = "참여중인 공고 목록 조회", description = "참여중인 공고 목록을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공")
    })
    @GetMapping("/me/group-participations")
    public ResponseEntity<List<ResponseGroupParticipation>> getParticipationGroups(@RequestHeader("UserId") String userId) {
        List<ResponseGroupParticipation> responseGroupParticipations = groupParticipationService.findByUserId(userId).stream()
                .map(groupParticipationDto -> modelMapper.map(groupParticipationDto, ResponseGroupParticipation.class))
                .toList();

        return ResponseEntity.ok(responseGroupParticipations);
    }

    @Operation(summary = "참여중인 공고 탈퇴", description = "참여중인 공고를 탈퇴합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "성공"),
            @ApiResponse(responseCode = "403", description = "공고참여가 되어있는 사용자가 아닌 다른 사용자가 탈퇴를 요청하는 경우"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 공고참여인 경우")
    })
    @DeleteMapping("/me/group-participations/{groupParticipationId}")
    public ResponseEntity deleteGroupParticipation(@RequestHeader("UserId") String userId, @PathVariable String groupParticipationId) {
        groupParticipationService.deleteByGroupParticipationId(userId, groupParticipationId);

        return ResponseEntity.noContent().build();
    }

}
