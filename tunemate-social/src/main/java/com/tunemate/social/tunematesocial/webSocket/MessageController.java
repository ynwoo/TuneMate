package com.tunemate.social.tunematesocial.webSocket;

import com.tunemate.social.tunematesocial.dto.ChatDto;
import com.tunemate.social.tunematesocial.entity.ChattingRoom;
import com.tunemate.social.tunematesocial.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessageSendingOperations simpMessageSendingOperations;
    private final ChatService chatService;

    @MessageMapping("/chat/{relationId}")
    @SendTo("/sub/chat/{relationId}")
    public ChattingRoom message(@DestinationVariable Long relationId, ChatDto chatDto){

        return chatService.getChat(relationId,chatDto);
    }
}
