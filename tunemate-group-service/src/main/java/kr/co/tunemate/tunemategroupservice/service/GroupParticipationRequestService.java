package kr.co.tunemate.tunemategroupservice.service;

import kr.co.tunemate.tunemategroupservice.dto.layertolayer.GroupParticipationRequestDto;

import java.util.List;

public interface GroupParticipationRequestService {
    void saveGroupParticipationRequest(String userId, String groupId);

    List<GroupParticipationRequestDto> findAllByUserId(String userId);

    void acceptGroupParticipationRequest(String userId, String groupParticipationRequestId);

    void denyGroupParticipationRequest(String userId, String groupParticipationRequestId);
}
