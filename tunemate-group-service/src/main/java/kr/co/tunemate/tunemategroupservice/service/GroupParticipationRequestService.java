package kr.co.tunemate.tunemategroupservice.service;

import kr.co.tunemate.tunemategroupservice.dto.layertolayer.GroupParticipationRequestDto;

public interface GroupParticipationRequestService {
    void saveGroupParticipationRequest(String userId, String groupId);
}
