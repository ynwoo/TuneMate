package kr.co.tunemate.tunemategroupservice.service;

import kr.co.tunemate.tunemategroupservice.dto.layertolayer.GroupParticipationDto;

import java.util.List;

public interface GroupParticipationService {
    List<GroupParticipationDto> findByUserId(String userId);

    void deleteByGroupParticipationId(String userId, String groupParticipationId);
}
