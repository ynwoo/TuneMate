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

import java.util.ArrayList;

@Controller
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessageSendingOperations simpMessageSendingOperations;


    @MessageMapping("/hello/{relationId}")
    @SendTo("/sub/channel/{relationId}")
    public ChatDto message(@DestinationVariable Long relationId,ChatDto chatDto){

        return chatDto;
    }
}
