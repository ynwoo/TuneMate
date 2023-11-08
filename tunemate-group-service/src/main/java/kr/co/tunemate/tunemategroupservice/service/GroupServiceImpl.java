package kr.co.tunemate.tunemategroupservice.service;

import kr.co.tunemate.tunemategroupservice.dto.GroupDto;
import kr.co.tunemate.tunemategroupservice.entity.Group;
import kr.co.tunemate.tunemategroupservice.exception.NoAuthorizationForItemException;
import kr.co.tunemate.tunemategroupservice.exception.NoSuchItemException;
import kr.co.tunemate.tunemategroupservice.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
