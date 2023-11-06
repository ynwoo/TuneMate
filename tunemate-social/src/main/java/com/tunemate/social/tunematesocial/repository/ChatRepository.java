package com.tunemate.social.tunematesocial.repository;


import com.tunemate.social.tunematesocial.entity.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChatRepository extends MongoRepository<Message, Long> {
    Message findByChatRoomId(Long relationId);
}
