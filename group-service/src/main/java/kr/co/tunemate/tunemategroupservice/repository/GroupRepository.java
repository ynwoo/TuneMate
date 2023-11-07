package kr.co.tunemate.tunemategroupservice.repository;

import kr.co.tunemate.tunemategroupservice.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GroupRepository extends JpaRepository<Group, Long> {
    Optional<Group> findByGroupId(String groupId);
}
