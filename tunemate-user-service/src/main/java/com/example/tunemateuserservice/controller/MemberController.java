package com.example.tunemateuserservice.controller;

import com.example.tunemateuserservice.dto.MemberDto;
import com.example.tunemateuserservice.dto.ReissueDto;
import com.example.tunemateuserservice.exception.NoPermissionException;
import com.example.tunemateuserservice.service.JwtTokenService;
import com.example.tunemateuserservice.service.MemberService;
import com.example.tunemateuserservice.vo.ResponseMember;
import com.example.tunemateuserservice.vo.ResponseMemberInfo;
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

    @GetMapping("/{userId}")
    public ResponseEntity<ResponseMember> getMember(@PathVariable String userId, @RequestHeader("UserId") String headerUserId) {
        if (!userId.equals(headerUserId)) {
            throw new NoPermissionException("다른 사용자의 리소스에 접근할 수 없습니다.", HttpStatus.FORBIDDEN);
        }

        MemberDto memberDto = memberService.getMemberDetailsByUserId(userId);
        ResponseMember responseMember = mapper.map(memberDto, ResponseMember.class);

        return ResponseEntity.ok(responseMember);
    }

    @PostMapping
    public ResponseEntity<List<ResponseMemberInfo>> getMembersByUserIdIn(@RequestBody List<String> userIds) {
        return ResponseEntity.ok(memberService.getMembersByUserIdIn(userIds).stream().map(memberDto -> mapper.map(memberDto, ResponseMemberInfo.class)).toList());
    }

    @GetMapping("/reissue")
    public ResponseEntity reissueAccessToken(@RequestHeader(HttpHeaders.AUTHORIZATION) String authHeaderValue) {
        String refreshToken = authHeaderValue.replace("Bearer ", "");

        ReissueDto reissueDto = jwtTokenService.reissueAccessToken(refreshToken);

        return ResponseEntity.ok(reissueDto);
    }

    @GetMapping
    public ResponseEntity test() {
        return ResponseEntity.ok("ok");
    }
}
