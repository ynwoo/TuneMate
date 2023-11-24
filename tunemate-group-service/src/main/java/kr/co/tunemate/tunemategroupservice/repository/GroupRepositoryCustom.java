package kr.co.tunemate.tunemategroupservice.repository;

import kr.co.tunemate.tunemategroupservice.dto.layertolayer.GroupSearchDto;
import kr.co.tunemate.tunemategroupservice.entity.Group;

import java.util.List;

public interface GroupRepositoryCustom {
    List<Group> searchAll(GroupSearchDto groupSearchDto);
}
