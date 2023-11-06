package kr.co.tunemate.groupservice.service;

import kr.co.tunemate.groupservice.dto.GroupDto;
import kr.co.tunemate.groupservice.entity.Group;
import kr.co.tunemate.groupservice.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {
    private final GroupRepository groupRepository;
    private final ModelMapper modelMapper;

    @Override
    public GroupDto saveGroup(GroupDto groupDto) {
        Group group = modelMapper.map(groupDto, Group.class);
        group.setGroupId(UUID.randomUUID().toString());

        groupRepository.save(group);

        return groupDto;
    }
}
