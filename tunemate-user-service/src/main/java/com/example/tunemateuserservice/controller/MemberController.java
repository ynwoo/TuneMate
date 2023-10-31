package com.example.tunemateuserservice.controller;

import com.example.tunemateuserservice.dto.MemberDto;
import com.example.tunemateuserservice.service.MemberService;
import com.example.tunemateuserservice.vo.ResponseMember;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/users")
public class MemberController {
    private final MemberService memberService;
    private final ModelMapper mapper;

    @GetMapping("/{userId}")
    public ResponseEntity<ResponseMember> getMember(@PathVariable String userId) {
        MemberDto memberDto = memberService.getMemberDetailsByUserId(userId);
        ResponseMember responseMember = mapper.map(memberDto, ResponseMember.class);

        return ResponseEntity.ok(responseMember);
    }

}
