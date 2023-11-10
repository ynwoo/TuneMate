package kr.co.tunemate.tunemategroupservice.service;

import kr.co.tunemate.tunemategroupservice.entity.Group;
import kr.co.tunemate.tunemategroupservice.entity.GroupParticipationRequest;
import kr.co.tunemate.tunemategroupservice.repository.GroupParticipationRequestRepository;
import kr.co.tunemate.tunemategroupservice.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class GroupParticipationRequestServiceImpl implements GroupParticipationRequestService {
    private final GroupRepository groupRepository;
    private final GroupParticipationRequestRepository groupParticipationRequestRepository;

    @Override
    public void saveGroupParticipationRequest(String userId, String groupId) {
        Group group = groupRepository.getReferenceByGroupId(groupId);

        GroupParticipationRequest groupParticipationRequest = GroupParticipationRequest.builder()
                .groupParticipationRequestId(UUID.randomUUID().toString())
                .group(group)
                .userId(userId)
                .build();

        groupParticipationRequestRepository.save(groupParticipationRequest);
    }
}
