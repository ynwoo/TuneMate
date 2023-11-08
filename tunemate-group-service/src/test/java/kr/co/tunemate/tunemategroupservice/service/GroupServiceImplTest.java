package kr.co.tunemate.tunemategroupservice.service;

import kr.co.tunemate.tunemategroupservice.dto.GroupDto;
import kr.co.tunemate.tunemategroupservice.entity.Group;
import kr.co.tunemate.tunemategroupservice.repository.GroupRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@SpringBootTest
class GroupServiceImplTest {
    @Autowired
    GroupService groupService;
    @Autowired
    GroupRepository groupRepository;
    @Autowired
    ModelMapper modelMapper;

    @Transactional
    @DisplayName("공고를 저장")
    @Test
    void saveGroup() {
        // given
        final String name = "엄복동";
        final String userId = UUID.randomUUID().toString();

        GroupDto groupDto = GroupDto.builder()
                .groupId(null)
                .hostId(userId)
                .hostName(name)
                .title("공고 제목")
                .capacity(4)
                .participantsCnt(1)
                .concertId("콘서트 UUID")
                .deadline(LocalDateTime.of(2023, 11, 7, 14, 57))
                .content("공고 내용")
                .build();

        // when
        GroupDto returnGroupDto = groupService.saveGroup(groupDto);

        // then
        Group returnGroup = groupRepository.findByGroupId(returnGroupDto.getGroupId()).get();
        GroupDto mappedDto = modelMapper.map(returnGroup, GroupDto.class);

        Assertions.assertThat(returnGroupDto).isEqualTo(mappedDto);
    }

    @Transactional
    @DisplayName("공고 제목 없이 공고를 저장")
    @Test
    void saveGroupWithoutTitle() {
        // given
        final String name = "엄복동";
        final String userId = UUID.randomUUID().toString();

        GroupDto groupDto = GroupDto.builder()
                .groupId(null)
                .hostId(userId)
                .hostName(name)
                .title(null)
                .capacity(4)
                .participantsCnt(1)
                .concertId("콘서트 UUID")
                .deadline(LocalDateTime.of(2023, 11, 7, 14, 57))
                .content("공고 내용")
                .build();

        // when
        // then
        Assertions.assertThatThrownBy(() -> groupService.saveGroup(groupDto));
    }

    @Transactional
    @DisplayName("공고 UUID로 공고 조회")
    @Test
    void getGroupByGroupId() {
        // given
        final String name = "엄복동";
        final String userId = UUID.randomUUID().toString();

        GroupDto groupDto = GroupDto.builder()
                .groupId(null)
                .hostId(userId)
                .hostName(name)
                .title("공고 제목")
                .capacity(4)
                .participantsCnt(1)
                .concertId("콘서트 UUID")
                .deadline(LocalDateTime.of(2023, 11, 7, 14, 57))
                .content("공고 내용")
                .build();

        groupDto = groupService.saveGroup(groupDto);

        // when
        GroupDto returnGroupDto = groupService.getGroupByGroupId(groupDto.getGroupId());

        // then
        Assertions.assertThat(returnGroupDto).isEqualTo(groupDto);
    }

    @Transactional
    @DisplayName("존재하지 않는 공고 UUID로 공고 조회")
    @Test
    void getGroupByNotExistingGroupId() {
        // given
        final String name = "엄복동";
        final String userId = UUID.randomUUID().toString();

        GroupDto groupDto = GroupDto.builder()
                .groupId(null)
                .hostId(userId)
                .hostName(name)
                .title("공고 제목")
                .capacity(4)
                .participantsCnt(1)
                .concertId("콘서트 UUID")
                .deadline(LocalDateTime.of(2023, 11, 7, 14, 57))
                .content("공고 내용")
                .build();

        groupDto = groupService.saveGroup(groupDto);

        // when
        // then
        Assertions.assertThatThrownBy(() -> groupService.getGroupByGroupId(UUID.randomUUID().toString()));
    }
}