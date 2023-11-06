package com.tunemate.social.tunematesocial.service;

import com.tunemate.social.tunematesocial.dto.ChatDto;
import com.tunemate.social.tunematesocial.entity.Message;
import com.tunemate.social.tunematesocial.repository.ChatPersonRepository;
import com.tunemate.social.tunematesocial.repository.ChatRepository;
import com.tunemate.social.tunematesocial.repository.FriendRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@Slf4j
@AllArgsConstructor
public class ChatServiceImpl implements ChatService{

    private final ChatRepository chatRepository;
    private final ChatPersonRepository chatPersonRepository;
    private final FriendRepository friendRepository;

    @Override
    public Message getChat(long relationId, ChatDto chatDto){
        Message msg = chatRepository.findByChatRoomId(relationId);
        chatDto.setTime(LocalDateTime.now());
        chatDto.setType("Message");
        if(chatPersonRepository.findByRelationId(friendRepository.findById(relationId).get()).size() == 2){
            chatDto.setReadCount(0);
        }
        else{
            chatDto.setReadCount(1);
        }
        msg.getMessages().add(0,chatDto);
        chatRepository.save(msg);
        return msg;
    }
}
