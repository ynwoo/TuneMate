package com.tunemate.social.tunematesocial.service;

import com.tunemate.social.tunematesocial.dto.ChatDto;
import com.tunemate.social.tunematesocial.entity.ChattingRoom;
import com.tunemate.social.tunematesocial.repository.ChatPersonRepository;
import com.tunemate.social.tunematesocial.repository.ChattingRoomRepository;
import com.tunemate.social.tunematesocial.repository.FriendRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@Slf4j
@AllArgsConstructor
public class ChatServiceImpl implements ChatService{

    private final ChattingRoomRepository chattingRoomRepository;
    private final ChatPersonRepository chatPersonRepository;
    private final FriendRepository friendRepository;

    @Override
    public ChattingRoom getChat(long relationId, ChatDto chatDto){
        ChattingRoom msg = chattingRoomRepository.findByChatRoomId(relationId);
        chatDto.setTime(LocalDateTime.now());
        chatDto.setType("Message");
        if(chatPersonRepository.findByFriend(friendRepository.findById(relationId).get()).size() == 2){
            chatDto.setReadCount(0);
        }
        else{
            chatDto.setReadCount(1);
        }
        msg.getMessages().add(chatDto);
        chattingRoomRepository.save(msg);
        return msg;
    }
}
