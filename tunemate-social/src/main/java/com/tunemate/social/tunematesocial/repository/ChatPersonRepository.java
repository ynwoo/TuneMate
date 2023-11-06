package com.tunemate.social.tunematesocial.repository;

import com.tunemate.social.tunematesocial.entity.Chat;
import com.tunemate.social.tunematesocial.entity.Friend;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatPersonRepository extends JpaRepository<Chat,Long> {

    List<Chat> findByRelationId(Friend relationId);

    Chat findByRelationIdAndUserId(Friend relationId, String userId);
}
