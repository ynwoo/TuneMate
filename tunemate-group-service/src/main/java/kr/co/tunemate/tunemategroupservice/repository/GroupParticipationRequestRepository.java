package kr.co.tunemate.tunemategroupservice.repository;

import kr.co.tunemate.tunemategroupservice.entity.Group;
import kr.co.tunemate.tunemategroupservice.entity.GroupParticipationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GroupParticipationRequestRepository extends JpaRepository<GroupParticipationRequest, Long> {
    Optional<GroupParticipationRequest> findByGroupParticipationRequestId(String groupParticipationRequestId);

    Optional<GroupParticipationRequest> findByUserIdAndGroup(String userId, Group group);

    List<GroupParticipationRequest> findAllByUserId(String userId);

    List<GroupParticipationRequest> findAllByGroupIn(List<Group> groups);

    void deleteByUserIdAndGroupParticipationRequestId(String userId, String groupParticipationRequest);
}
