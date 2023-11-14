package kr.co.tunemate.tunemategroupservice.service;

import kr.co.tunemate.tunemategroupservice.dto.layertolayer.GroupDto;
import kr.co.tunemate.tunemategroupservice.dto.layertolayer.GroupSearchDto;
import kr.co.tunemate.tunemategroupservice.entity.Group;
import kr.co.tunemate.tunemategroupservice.exception.BaseException;
import kr.co.tunemate.tunemategroupservice.exception.code.GroupErrorCode;
import kr.co.tunemate.tunemategroupservice.repository.ConcertRepository;
import kr.co.tunemate.tunemategroupservice.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {
    private final GroupRepository groupRepository;
    private final ConcertRepository concertRepository;
    private final ModelMapper modelMapper;

    @Transactional
    @Override
    public GroupDto saveGroup(String userId, GroupDto groupDto) {
        concertRepository.findById(Long.valueOf(groupDto.getConcertId())).orElseThrow(() -> new BaseException("존재하지 않는 콘서트입니다.", GroupErrorCode.NO_SUCH_ITEM_EXCEPTION.getHttpStatus()));

        groupDto.setGroupId(UUID.randomUUID().toString());
        groupDto.setHostId(userId);
        groupDto.setHostName("동기요청으로 가져오기");
        Group group = modelMapper.map(groupDto, Group.class);

        group = groupRepository.save(group);

        return modelMapper.map(group, GroupDto.class);
    }

    @Override
    public GroupDto getGroupByGroupId(String groupId) {
        Group group = groupRepository.findByGroupId(groupId).orElseThrow(() -> new BaseException("존재하지 않는 공고입니다.", GroupErrorCode.NO_SUCH_ITEM_EXCEPTION.getHttpStatus()));

        return modelMapper.map(group, GroupDto.class);
    }

    /**
     * 공고를 수정합니다.
     *
     * @param groupDto 공고 수정 내용
     * @return
     */
    @Transactional
    @Override
    public GroupDto putGroup(String userId, GroupDto groupDto) {
        Group group = groupRepository.findByGroupId(groupDto.getGroupId()).orElseThrow(() -> new BaseException("존재하지 않는 공고입니다.", GroupErrorCode.NO_SUCH_ITEM_EXCEPTION.getHttpStatus()));

        if (!group.getHostId().equals(userId)) {
            throw new BaseException("공고 작성자만 수정이 가능합니다.", GroupErrorCode.NO_AUTHORIZATION_FOR_ITEM_EXCEPTION.getHttpStatus());
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
     *
     * @param userId  요청자 UUID
     * @param groupId 마감대상 공고 UUID
     */
    @Transactional
    @Override
    public void closeGroup(String userId, String groupId) {
        Group group = groupRepository.findByGroupId(groupId).orElseThrow(() -> new BaseException("존재하지 않는 공고입니다.", GroupErrorCode.NO_SUCH_ITEM_EXCEPTION.getHttpStatus()));

        if (!group.getHostId().equals(userId)) {
            throw new BaseException("공고 작성자만 마감이 가능합니다.", GroupErrorCode.NO_AUTHORIZATION_FOR_ITEM_EXCEPTION.getHttpStatus());
        }

        Group closedGroup = group.toBuilder()
                .closedByHost(true)
                .build();

        groupRepository.save(closedGroup);
    }

    /**
     * 검색 조건을 적용하여 공고를 조회합니다.
     *
     * @param groupSearchDto 검색 조건들
     * @return
     */
    @Transactional
    @Override
    public List<GroupDto> searchAll(GroupSearchDto groupSearchDto) {
        return groupRepository.searchAll(groupSearchDto).stream().map(group -> modelMapper.map(group, GroupDto.class)).toList();
    }

    /**
     * 공고를 삭제합니다.
     *
     * @param userId  요청자 UUID
     * @param groupId 삭제대상 공고 UUID
     */
    @Transactional
    @Override
    public void deleteGroupByGroupId(String userId, String groupId) {
        groupRepository.deleteByHostIdAndGroupId(userId, groupId);
    }
}
