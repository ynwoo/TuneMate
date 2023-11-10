package kr.co.tunemate.tunemategroupservice.service;

import kr.co.tunemate.tunemategroupservice.entity.Group;
import kr.co.tunemate.tunemategroupservice.entity.GroupParticipationRequest;
import kr.co.tunemate.tunemategroupservice.exception.IllegalRequestException;
import kr.co.tunemate.tunemategroupservice.exception.NoSuchItemException;
import kr.co.tunemate.tunemategroupservice.repository.GroupParticipationRequestRepository;
import kr.co.tunemate.tunemategroupservice.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class GroupParticipationRequestServiceImpl implements GroupParticipationRequestService {
    private final GroupRepository groupRepository;
    private final GroupParticipationRequestRepository groupParticipationRequestRepository;

    /**
     * 사용자가 공고에 대해 참여 요청을 생성합니다.
     * @param userId 요청자 UUID
     * @param groupId 공고 UUID
     */
    @Override
    public void saveGroupParticipationRequest(String userId, String groupId) {
        Group group = groupRepository.findByGroupId(groupId).orElseThrow(() -> new NoSuchItemException("존재하지 않는 공고입니다.", HttpStatus.NOT_FOUND));

        if (canParticipate(group)) {
            throw new IllegalRequestException("마감일 지남/작성자에 의한 마감/인원 초과 로 인해 참가 요청을 생성할 수 없습니다.", HttpStatus.BAD_REQUEST);
        }

        GroupParticipationRequest groupParticipationRequest = GroupParticipationRequest.builder()
                .groupParticipationRequestId(UUID.randomUUID().toString())
                .group(group)
                .userId(userId)
                .build();

        log.info("사용자(userId: {})가 공고 {} 에 대해서 참여 요청을 생성했습니다.", userId, group);

        groupParticipationRequestRepository.save(groupParticipationRequest);
    }

    private static boolean canParticipate(Group group) {
        return group.getClosedByHost() || group.getDeadline().isBefore(LocalDateTime.now()) || group.getParticipantsCnt() >= group.getCapacity();
    }
}
