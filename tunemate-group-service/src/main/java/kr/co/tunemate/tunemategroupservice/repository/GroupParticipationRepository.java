package kr.co.tunemate.tunemategroupservice.repository;

import kr.co.tunemate.tunemategroupservice.entity.Group;
import kr.co.tunemate.tunemategroupservice.entity.GroupParticipation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GroupParticipationRepository extends JpaRepository<GroupParticipation, Long> {
    Optional<GroupParticipation> findByUserIdAndGroup(String userId, Group group);

    Optional<GroupParticipation> findByGroupParticipationId(String groupParticipationId);

    List<GroupParticipation> findAllByUserId(String userId);

    List<GroupParticipation> findAllByGroup(Group group);

    void deleteByGroupParticipationId(String groupParticipationId);

    Long countByGroup(Group group);
}
