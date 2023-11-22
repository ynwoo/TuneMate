package com.tunemate.social.tunematesocial.repository;

import com.tunemate.social.tunematesocial.entity.ChatPerson;
import com.tunemate.social.tunematesocial.entity.Friend;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatPersonRepository extends JpaRepository<ChatPerson,Long> {

    List<ChatPerson> findByFriend(Friend friend);

    ChatPerson findByFriendAndUserId(Friend friend, String userId);
}
