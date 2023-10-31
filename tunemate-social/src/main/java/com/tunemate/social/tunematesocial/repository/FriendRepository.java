package com.tunemate.social.tunematesocial.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tunemate.social.tunematesocial.entity.Friend;

public interface FriendRepository extends JpaRepository<Friend, Long> {

}
