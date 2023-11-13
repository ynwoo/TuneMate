package kr.co.tunemate.tunemategroupservice.service;

import kr.co.tunemate.tunemategroupservice.dto.layertolayer.GroupParticipationDto;
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

    @Override
    public List<GroupParticipationDto> findByUserId(String userId) {
        return groupParticipationRepository.findAllByUserId(userId).stream()
                .map(groupParticipation -> modelMapper.map(groupParticipation, GroupParticipationDto.class)).toList();
    }
}
