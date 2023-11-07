package com.tunemate.social.tunematesocial.webSocket;

import com.tunemate.social.tunematesocial.dto.ChatDto;
import com.tunemate.social.tunematesocial.entity.ChattingRoom;
import com.tunemate.social.tunematesocial.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.Message;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Controller
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessageSendingOperations simpMessageSendingOperations;
    private final ChatService chatService;

    @MessageMapping("/chat")
    public void message(@Payload ChatDto message, SimpMessageHeaderAccessor headerAccessor){
        headerAccessor.getSessionAttributes().put("username",message.getSenderName());
        message.setTime(LocalDateTime.now());
        message.setReadCount(1);
//        chatService.getChat(message.getRelationId(),message);
        simpMessageSendingOperations.convertAndSend("/topic/"+message.getRelationId(),chatService.getChat(message.getRelationId(),message));
    }
}
