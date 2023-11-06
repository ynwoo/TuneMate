package com.tunemate.social.tunematesocial.webSocket;

import com.tunemate.social.tunematesocial.dto.ChatDto;
import com.tunemate.social.tunematesocial.entity.Message;
import com.tunemate.social.tunematesocial.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Controller
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessageSendingOperations simpMessageSendingOperations;
    private final ChatRepository chatRepository;

    @MessageMapping("/chat/{relationId}")
    @SendTo("/sub/chat/{relationId}")
    public Message message(@DestinationVariable Long relationId,ChatDto chatDto){
        Message msg = chatRepository.findByChatRoomId(relationId);
        chatDto.setTime(LocalDateTime.now());
        chatDto.setType("Message");
        chatDto.setReadCount(1);
        msg.getMessages().add(0,chatDto);
        chatRepository.save(msg);
        return msg;
    }
}
