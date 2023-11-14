package kr.co.tunemate.tunemategroupservice.service;

import kr.co.tunemate.tunemategroupservice.dto.layertolayer.GroupDto;
import kr.co.tunemate.tunemategroupservice.dto.layertolayer.GroupParticipationDto;
import kr.co.tunemate.tunemategroupservice.entity.GroupParticipation;
import kr.co.tunemate.tunemategroupservice.exception.BaseException;
import kr.co.tunemate.tunemategroupservice.exception.code.GroupErrorCode;
import kr.co.tunemate.tunemategroupservice.repository.GroupParticipationRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
                .map(groupParticipation -> {
                    GroupParticipationDto groupParticipationDto = modelMapper.map(groupParticipation, GroupParticipationDto.class);
                    GroupDto groupDto = modelMapper.map(groupParticipation.getGroup(), GroupDto.class);

                    groupParticipationDto.setGroupDto(groupDto);

                    return groupParticipationDto;
                }).toList();
    }

    /**
     * 사용자가 참여중인 공고를 탈퇴합니다.
     *
     * @param groupParticipationId 공고참여 UUID
     */
    @Transactional
    @Override
    public void deleteByGroupParticipationId(String userId, String groupParticipationId) {
        GroupParticipation groupParticipation = groupParticipationRepository.findByGroupParticipationId(groupParticipationId).orElseThrow(() -> new BaseException("존재하지 않는 공고참여입니다.", GroupErrorCode.NO_SUCH_ITEM_EXCEPTION.getHttpStatus()));

        if (!groupParticipation.getUserId().equals(userId)) {
            throw new BaseException("자신의 공고참여에 대해서만 탈퇴를 요청할 수 있습니다.", GroupErrorCode.NO_AUTHORIZATION_FOR_ITEM_EXCEPTION.getHttpStatus());
        }

        if (groupParticipation.getGroup().getHostId().equals(userId)) {
            throw new BaseException("공고 작성자는 탈퇴를 할 수 없고 삭제만 가능합니다.", GroupErrorCode.ILLEGAL_REQUEST.getHttpStatus());
        }

        groupParticipationRepository.delete(groupParticipation);
    }
}
