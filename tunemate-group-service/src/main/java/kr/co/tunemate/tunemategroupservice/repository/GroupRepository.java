package kr.co.tunemate.tunemategroupservice.repository;

import kr.co.tunemate.tunemategroupservice.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GroupRepository extends JpaRepository<Group, Long>, GroupRepositoryCustom {
    Optional<Group> findByGroupId(String groupId);

    List<Group> getReferencesByHostId(String hostId);

    void deleteByHostIdAndGroupId(String groupId, String hostId);

    Group getReferenceByGroupId(String groupId);
}