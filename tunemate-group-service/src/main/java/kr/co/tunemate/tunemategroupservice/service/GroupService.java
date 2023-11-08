package kr.co.tunemate.tunemategroupservice.service;

import kr.co.tunemate.tunemategroupservice.dto.GroupDto;

public interface GroupService {
    GroupDto saveGroup(GroupDto groupDto);
    GroupDto getGroupByGroupId(String groupId);
}
