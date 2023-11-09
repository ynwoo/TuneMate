package kr.co.tunemate.tunemategroupservice.service;

import kr.co.tunemate.tunemategroupservice.dto.GroupDto;
import kr.co.tunemate.tunemategroupservice.dto.GroupSearchDto;
import kr.co.tunemate.tunemategroupservice.entity.Group;
import kr.co.tunemate.tunemategroupservice.exception.NoAuthorizationForItemException;
import kr.co.tunemate.tunemategroupservice.exception.NoSuchItemException;
import kr.co.tunemate.tunemategroupservice.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {
    private final GroupRepository groupRepository;
    private final ModelMapper modelMapper;

    @Override
    public GroupDto saveGroup(GroupDto groupDto) {
        groupDto.setGroupId(UUID.randomUUID().toString());
        Group group = modelMapper.map(groupDto, Group.class);

        group = groupRepository.save(group);

        return modelMapper.map(group, GroupDto.class);
    }

    @Override
    public GroupDto getGroupByGroupId(String groupId) {
        Group group = groupRepository.findByGroupId(groupId).orElseThrow(() -> new NoSuchItemException("존재하지 않는 공고입니다.", HttpStatus.NOT_FOUND));

        return modelMapper.map(group, GroupDto.class);
    }

    /**
     * 공고를 수정합니다.
     * @param groupDto 공고 수정 내용
     * @return
     */
    @Transactional
    @Override
    public GroupDto putGroup(String userId, GroupDto groupDto) {
        Group group = groupRepository.findByGroupId(groupDto.getGroupId()).orElseThrow(() -> new NoSuchItemException("존재하지 않는 공고입니다.", HttpStatus.NOT_FOUND));

        if (!group.getHostId().equals(userId)) {
            throw new NoAuthorizationForItemException("공고 작성자만 수정이 가능합니다.", HttpStatus.FORBIDDEN);
        }

        Group modifiedGroup = group.toBuilder()
                .title(groupDto.getTitle())
                .content(groupDto.getContent())
                .capacity(groupDto.getCapacity())
                .deadline(groupDto.getDeadline())
                .concertId(groupDto.getConcertId())
                .build();

        Group savedGroup = groupRepository.save(modifiedGroup);

        return modelMapper.map(savedGroup, GroupDto.class);
    }

    /**
     * 공고를 마감합니다.
     * @param userId 요청자 UUID
     * @param groupId 마감대상 공고 UUID
     */
    @Transactional
    @Override
    public void closeGroup(String userId, String groupId) {
        Group group = groupRepository.findByGroupId(groupId).orElseThrow(() -> new NoSuchItemException("존재하지 않는 공고입니다.", HttpStatus.NOT_FOUND));

        if (!group.getHostId().equals(userId)) {
            throw new NoAuthorizationForItemException("공고 작성자만 마감이 가능합니다.", HttpStatus.FORBIDDEN);
        }

        Group closedGroup = group.toBuilder()
                .closedByHost(true)
                .build();

        groupRepository.save(closedGroup);
    }

    /**
     * 검색 조건을 적용하여 공고를 조회합니다.
     * @param groupSearchDto 검색 조건들
     * @return
     */
    @Override
    public List<GroupDto> searchAll(GroupSearchDto groupSearchDto) {
        return groupRepository.searchAll(groupSearchDto).stream().map(group -> modelMapper.map(group, GroupDto.class)).toList();
    }

    /**
     * 공고를 삭제합니다.
     * @param userId 요청자 UUID
     * @param groupId 삭제대상 공고 UUID
     */
    @Override
    public void deleteGroupByGroupId(String userId, String groupId) {
        groupRepository.deleteByHostIdAndGroupId(userId, groupId);
    }
}
