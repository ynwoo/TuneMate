package kr.co.tunemate.tunemategroupservice.repository;

import kr.co.tunemate.tunemategroupservice.entity.Group;
import kr.co.tunemate.tunemategroupservice.entity.GroupParticipationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GroupParticipationRequestRepository extends JpaRepository<GroupParticipationRequest, Long> {
    Optional<GroupParticipationRequest> findByGroupParticipationRequestId(String groupParticipationRequestId);

    Optional<GroupParticipationRequest> findByUserIdAndGroup(String userId, Group group);

    void deleteByUserIdAndGroupParticipationRequestId(String userId, String groupParticipationRequest);
}
