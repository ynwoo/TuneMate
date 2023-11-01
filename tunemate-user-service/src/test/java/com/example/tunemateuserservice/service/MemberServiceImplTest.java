package com.example.tunemateuserservice.service;

import com.example.tunemateuserservice.dto.MemberDto;
import com.example.tunemateuserservice.model.Member;
import com.example.tunemateuserservice.repository.MemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class MemberServiceImplTest {
    @Autowired
    MemberService memberService;
    @Autowired
    MemberRepository memberRepository;

    @Test
    void getMembersByUserIdIn() {
        //given
        List<String> userIds = List.of("userId1", "userId2", "userId3");
        List<String> emails = List.of("email1", "email2", "email3");
        List<String> spotifyUserIds = List.of("spotifyUserId1", "spotifyUserId2", "spotifyUserId3");

        for (int i = 0; i < userIds.size(); i++) {
            Member member = Member.builder()
                    .userId(userIds.get(i))
                    .name("name")
                    .email(emails.get(i))
                    .spotifyUserId(spotifyUserIds.get(i))
                    .refreshToken("refreshToken")
                    .spotifyAccessToken("spotifyAccessToken")
                    .spotifyRefreshToken("spotifyRefreshToken")
                    .build();

            memberRepository.save(member);
        }

        //when
        List<MemberDto> resultMembers = memberService.getMembersByUserIdIn(userIds);

        //then
        Assertions.assertThat(resultMembers).hasSize(userIds.size());
    }
}