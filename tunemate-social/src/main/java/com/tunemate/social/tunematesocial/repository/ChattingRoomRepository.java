package com.tunemate.social.tunematesocial.repository;


import com.tunemate.social.tunematesocial.entity.ChattingRoom;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChattingRoomRepository extends MongoRepository<ChattingRoom, Long> {
    ChattingRoom findByChatRoomId(Long relationId);
}
