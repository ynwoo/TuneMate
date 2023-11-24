package kr.co.tunemate.tunemateuserservice.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import kr.co.tunemate.tunemateuserservice.dto.MemberDto;
import kr.co.tunemate.tunemateuserservice.dto.ReissueDto;
import kr.co.tunemate.tunemateuserservice.exception.NoPermissionException;
import kr.co.tunemate.tunemateuserservice.service.JwtTokenService;
import kr.co.tunemate.tunemateuserservice.service.MemberService;
import kr.co.tunemate.tunemateuserservice.vo.ResponseMember;
import kr.co.tunemate.tunemateuserservice.vo.ResponseMemberInfo;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class MemberController {
    private final MemberService memberService;
    private final JwtTokenService jwtTokenService;
    private final ModelMapper mapper;

    @Operation(summary = "사용자 정보 조회", description = "사용자 정보를 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "403", description = "다른 사용자의 정보를 조회하는 경우"),
            @ApiResponse(responseCode = "404", description = "userId인 사용자가 존재하지 않는 경우")
    })
    @GetMapping("/{userId}")
    public ResponseEntity<ResponseMember> getMember(@PathVariable String userId, @RequestHeader("UserId") String headerUserId) {
        if (!userId.equals(headerUserId)) {
            throw new NoPermissionException("다른 사용자의 리소스에 접근할 수 없습니다.", HttpStatus.FORBIDDEN);
        }

        MemberDto memberDto = memberService.getMemberDetailsByUserId(userId);
        ResponseMember responseMember = mapper.map(memberDto, ResponseMember.class);

        return ResponseEntity.ok(responseMember);
    }

    @Operation(summary = "사용자 정보 목록 조회", description = "사용자 정보 목록을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공")
    })
    @PostMapping
    public ResponseEntity<List<ResponseMemberInfo>> getMembersByUserIdIn(@RequestBody List<String> userIds) {
        return ResponseEntity.ok(memberService.getMembersByUserIdIn(userIds).stream().map(memberDto -> mapper.map(memberDto, ResponseMemberInfo.class)).toList());
    }

    @Operation(summary = "Tunemate 리프레시 토큰으로 액세스 토큰을 갱신", description = "Tunemate 리프레시 토큰으로 액세스 토큰을 갱신합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "400", description = "유효하지 않은 리프레시 토큰인 경우")
    })
    @GetMapping("/reissue")
    public ResponseEntity reissueAccessToken(@RequestHeader(HttpHeaders.AUTHORIZATION) String authHeaderValue) {
        String refreshToken = authHeaderValue.replace("Bearer ", "");

        ReissueDto reissueDto = jwtTokenService.reissueAccessToken(refreshToken);

        return ResponseEntity.ok(reissueDto);
    }

    @Operation(summary = "테스트", description = "ok를 반환합니다.")
    @ApiResponse(responseCode = "200", description = "성공")
    @GetMapping
    public ResponseEntity test() {
        return ResponseEntity.ok("ok");
    }
}
