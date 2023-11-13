package kr.co.tunemate.tunemategroupservice.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import kr.co.tunemate.tunemategroupservice.service.GroupParticipationService;
import kr.co.tunemate.tunemategroupservice.vo.ResponseGroupParticipation;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

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
    @GetMapping("/me/participation-groups")
    public ResponseEntity<List<ResponseGroupParticipation>> getParticipationGroups(@RequestHeader("UserId") String userId) {
        List<ResponseGroupParticipation> responseGroupParticipations = groupParticipationService.findByUserId(userId).stream()
                .map(groupParticipationDto -> modelMapper.map(groupParticipationDto, ResponseGroupParticipation.class))
                .toList();

        return ResponseEntity.ok(responseGroupParticipations);
    }

}
