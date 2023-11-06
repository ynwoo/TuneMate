package kr.co.tunemate.groupservice.repository;

import kr.co.tunemate.groupservice.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository extends JpaRepository<Group, Long> {
}
