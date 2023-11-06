package com.tunemate.social.tunematesocial.entity;

import com.tunemate.social.tunematesocial.dto.ChatDto;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Document(collection = "chats")
public class Message {

    @Id
    private Long chatRoomId;

    private List<ChatDto> messages;



}
