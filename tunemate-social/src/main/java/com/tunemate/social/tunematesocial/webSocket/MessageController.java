package com.tunemate.social.tunematesocial.webSocket;

import com.tunemate.social.tunematesocial.dto.ChatDto;
import com.tunemate.social.tunematesocial.dto.RelationRequestDto;
import com.tunemate.social.tunematesocial.entity.ChattingRoom;
import com.tunemate.social.tunematesocial.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class MessageController {

    private final SimpMessageSendingOperations simpMessageSendingOperations;
    private final ChatService chatService;

    @MessageMapping("/chat")
    public void message(@Payload ChatDto message){
//        headerAccessor.getSessionAttributes().put("username",message.getSenderName());
        log.info("{} 사용자, 채팅방 번호 : {}",message.getSenderNo(),message.getRelationId());
        log.info(message.toString());
//        message.setTime(LocalDateTime.now());
//        message.setReadCount(1);
        simpMessageSendingOperations.convertAndSend("/topic/"+message.getRelationId(),chatService.getChat(message.getRelationId(),message));
    }

    @MessageMapping("/request")
    public void request(@Payload RelationRequestDto relationRequestDto){
        simpMessageSendingOperations.convertAndSend("/exchange/friend/"+relationRequestDto.getReceiveUserId(),relationRequestDto);
    }
}
