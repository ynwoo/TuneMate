package kr.co.tunemate.tunemategroupservice.service;

import kr.co.tunemate.tunemategroupservice.dto.layertolayer.GroupDto;
import kr.co.tunemate.tunemategroupservice.dto.layertolayer.GroupSearchDto;

import java.util.List;

public interface GroupService {
    GroupDto saveGroup(GroupDto groupDto);
    GroupDto getGroupByGroupId(String groupId);
    GroupDto putGroup(String userId, GroupDto groupDto);
    void closeGroup(String userId, String groupId);
    List<GroupDto> searchAll(GroupSearchDto groupSearchDto);
    void deleteGroupByGroupId(String userId, String groupId);
}
