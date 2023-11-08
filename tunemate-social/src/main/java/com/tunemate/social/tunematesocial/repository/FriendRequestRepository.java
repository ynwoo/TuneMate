package com.tunemate.social.tunematesocial.repository;

import java.util.List;
import java.util.Optional;

import com.tunemate.social.tunematesocial.dto.UserIdDto;
import org.springframework.data.jpa.repository.JpaRepository;

import com.tunemate.social.tunematesocial.entity.FriendRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {
	List<FriendRequest> findByRequestedUserId(String myId);

	Optional<FriendRequest> findByRequestedUserIdAndRequestingUserId(String myId, String userId);

	@Query(value = "select new com.tunemate.social.tunematesocial.dto.UserIdDto(f.requestedUserId) from FriendRequest f where f.requestingUserId = :userId ")
	List<UserIdDto> findByRequestingUserId(@Param("userId") String userId);
}
