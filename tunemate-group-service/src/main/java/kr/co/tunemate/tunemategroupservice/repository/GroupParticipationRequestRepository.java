package kr.co.tunemate.tunemategroupservice.repository;

import kr.co.tunemate.tunemategroupservice.entity.GroupParticipationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GroupParticipationRequestRepository extends JpaRepository<GroupParticipationRequest, Long> {
    Optional<GroupParticipationRequest> findByUserIdAndGroupParticipationRequestId(String userId, String groupParticipationRequestId);
    void deleteByUserIdAndGroupParticipationRequestId(String userId, String groupParticipationRequest);
}
