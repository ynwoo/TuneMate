package kr.co.tunemate.tunemategroupservice.service;

import kr.co.tunemate.tunemategroupservice.dto.layertolayer.GroupParticipationRequestDto;
import kr.co.tunemate.tunemategroupservice.entity.Group;
import kr.co.tunemate.tunemategroupservice.entity.GroupParticipationRequest;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.UUID;

@SpringBootTest
class GroupParticipationRequestServiceImplTest {
    @Autowired
    ModelMapper modelMapper;

    @DisplayName("연관관계를 가진 엔티티 -> Dto 매핑")
    @Test
    void mappingTest() {
        // given
        String groupId = UUID.randomUUID().toString();
        String groupParticipationRequestId = UUID.randomUUID().toString();
        String hostId = UUID.randomUUID().toString();

        Group group = Group.builder()
                .id(2L)
                .groupId(groupId)
                .hostId(hostId)
                .hostName("작성자 이름")
                .concertId("concertId")
                .title("공고 제목")
                .content("공고 내용")
                .capacity(6)
                .participantsCnt(2)
                .startDateTime(LocalDateTime.of(2023, 11, 9, 9, 36))
                .deadline(LocalDateTime.of(2023, 11, 11, 9, 00))
                .createdAt(LocalDateTime.of(2023, 11, 9, 9, 36))
                .lastModifiedAt(LocalDateTime.of(2023, 11, 9, 9, 40))
                .build();


        String requesterUserId = UUID.randomUUID().toString();

        GroupParticipationRequest groupParticipationRequest = GroupParticipationRequest.builder()
                .id(1L)
                .groupParticipationRequestId(groupParticipationRequestId)
                .group(group)
                .userId(requesterUserId)
                .createdAt(LocalDateTime.of(2023, 11, 10, 9, 36))
                .lastModifiedAt(LocalDateTime.of(2023, 11, 10, 9, 36))
                .build();

        // when
        GroupParticipationRequestDto groupParticipationRequestDto = modelMapper.map(groupParticipationRequest, GroupParticipationRequestDto.class);

        // then
        Assertions.assertThat(groupParticipationRequestDto.getGroupDto()).isNotNull();
    }
}