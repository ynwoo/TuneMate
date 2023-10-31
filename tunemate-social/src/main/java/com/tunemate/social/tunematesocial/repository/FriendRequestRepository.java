package com.tunemate.social.tunematesocial.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tunemate.social.tunematesocial.entity.FriendRequest;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {
	List<FriendRequest> findByRequestedUserId(String myId);
}
