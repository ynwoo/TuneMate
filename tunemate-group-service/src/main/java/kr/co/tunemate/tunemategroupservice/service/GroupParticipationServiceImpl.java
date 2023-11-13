package kr.co.tunemate.tunemategroupservice.service;

import kr.co.tunemate.tunemategroupservice.dto.layertolayer.GroupParticipationDto;
import kr.co.tunemate.tunemategroupservice.exception.BaseException;
import kr.co.tunemate.tunemategroupservice.exception.code.GroupErrorCode;
import kr.co.tunemate.tunemategroupservice.repository.GroupParticipationRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupParticipationServiceImpl implements GroupParticipationService {
    private final GroupParticipationRepository groupParticipationRepository;
    private final ModelMapper modelMapper;

    /**
     * 사용자가 참여중인 공고 목록을 조회합니다.
     *
     * @param userId 사용자 UUID
     * @return
     */
    @Override
    public List<GroupParticipationDto> findByUserId(String userId) {
        return groupParticipationRepository.findAllByUserId(userId).stream()
                .map(groupParticipation -> modelMapper.map(groupParticipation, GroupParticipationDto.class)).toList();
    }

    /**
     * 사용자가 참여중인 공고를 탈퇴합니다.
     *
     * @param groupParticipationId 공고참여 UUID
     */
    @Override
    public void deleteByGroupParticipationId(String userId, String groupParticipationId) {
        groupParticipationRepository.findByGroupParticipationId(groupParticipationId).orElseThrow(() -> new BaseException("존재하지 않는 공고참여입니다.", GroupErrorCode.NO_SUCH_ITEM_EXCEPTION.getHttpStatus()));
    }
}
