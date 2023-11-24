package kr.co.tunemate.tunemategroupservice.service;

import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.tunemate.tunemategroupservice.client.UserServiceClient;
import kr.co.tunemate.tunemategroupservice.dto.layertolayer.GroupDto;
import kr.co.tunemate.tunemategroupservice.dto.layertolayer.GroupSearchDto;
import kr.co.tunemate.tunemategroupservice.entity.Group;
import kr.co.tunemate.tunemategroupservice.entity.GroupParticipation;
import kr.co.tunemate.tunemategroupservice.exception.BaseException;
import kr.co.tunemate.tunemategroupservice.exception.code.GroupErrorCode;
import kr.co.tunemate.tunemategroupservice.repository.ConcertRepository;
import kr.co.tunemate.tunemategroupservice.repository.GroupParticipationRepository;
import kr.co.tunemate.tunemategroupservice.repository.GroupRepository;
import kr.co.tunemate.tunemategroupservice.vo.UserInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {
    private final GroupRepository groupRepository;
    private final ConcertRepository concertRepository;
    private final GroupParticipationRepository groupParticipationRepository;
    private final UserServiceClient userServiceClient;
    private final ModelMapper modelMapper;

    @Transactional
    @Override
    public GroupDto saveGroup(String userId, GroupDto groupDto) {
        log.info("사용자(userId: {})가 공고생성요청{}을 합니다.", userId, groupDto);

        concertRepository.findById(Long.valueOf(groupDto.getConcertId())).orElseThrow(() -> new BaseException("존재하지 않는 콘서트입니다.", GroupErrorCode.NO_SUCH_ITEM_EXCEPTION.getHttpStatus()));

        List<UserInfo> userInfos = userServiceClient.getUserInfo(List.of(userId));
        if (userInfos.isEmpty()) {
            throw new BaseException("존재하지 않는 사용자입니다.", GroupErrorCode.NO_SUCH_ITEM_EXCEPTION.getHttpStatus());
        }

        UserInfo userInfo = userInfos.get(0);

        groupDto.setGroupId(UUID.randomUUID().toString());
        groupDto.setHostId(userId);
        groupDto.setHostName(userInfo.getName());
        Group group = modelMapper.map(groupDto, Group.class);

        group = groupRepository.save(group);

        GroupParticipation groupParticipation = GroupParticipation.builder()
                .groupParticipationId(UUID.randomUUID().toString())
                .group(group)
                .userId(userId)
                .build();

        groupParticipationRepository.save(groupParticipation);

        log.info("사용자(userId: {})가 요청한 공고{}가 생성되었습니다. 공고참여{}도 생성되었습니다.", userId, group, groupParticipation);

        return modelMapper.map(group, GroupDto.class);
    }

    /**
     * 공고를 조회합니다.
     * @param groupId 공고 UUID
     * @return
     */
    @Override
    public GroupDto getGroupByGroupId(String groupId) {
        Group group = groupRepository.findByGroupId(groupId).orElseThrow(() -> new BaseException("존재하지 않는 공고입니다.", GroupErrorCode.NO_SUCH_ITEM_EXCEPTION.getHttpStatus()));
        List<GroupParticipation> groupParticipations = groupParticipationRepository.findAllByGroup(group);

        List<UserInfo> userInfos = userServiceClient.getUserInfo(groupParticipations.stream().map(GroupParticipation::getUserId).toList());

        GroupDto groupDto = modelMapper.map(group, GroupDto.class);
        groupDto.setParticipantsCnt((long) groupParticipations.size());
        groupDto.setUserInfos(userInfos);

        log.info("공고{}를 조회했습니다.", groupDto);

        return groupDto;
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

        log.info("사용자(userId: {})가 공고를 수정했습니다. 수정된 공고{}", userId, savedGroup);

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

        log.info("사용자(userId: {})가 공고를 마감했습니다. 마감된 공고{}", userId, closedGroup);
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
        log.info("검색 조건{}으로 공고 목록을 조회합니다.", groupSearchDto);

        return groupRepository.searchAll(groupSearchDto).stream().map(group -> {
            log.debug(group.toString());
            Long participantsCnt = groupParticipationRepository.countByGroup(group);

            GroupDto groupDto = modelMapper.map(group, GroupDto.class);
            groupDto.setParticipantsCnt(participantsCnt);

            return groupDto;
        }).toList();
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

        log.info("사용자(userId: {})가 공고(groupId: {})를 삭제했습니다.", userId, groupId);
    }
}
