package com.tunemate.social.tunematesocial.service;

import com.tunemate.social.tunematesocial.dto.ChatDto;
import com.tunemate.social.tunematesocial.dto.response.MyChatRoomListDto;
import com.tunemate.social.tunematesocial.entity.ChattingRoom;
import com.tunemate.social.tunematesocial.repository.ChatPersonRepository;
import com.tunemate.social.tunematesocial.repository.ChattingRoomRepository;
import com.tunemate.social.tunematesocial.repository.FriendRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

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
        if(chatDto.getContent().length()==0){
            log.info("빈 메시지 ==> 채팅 방 최초 접속 시 요청");
            return msg;
        }
        if(chatPersonRepository.findByFriend(friendRepository.findById(relationId).get()).size() == 2){
            chatDto.setReadCount(0);
        }
        else{
            chatDto.setReadCount(1);
        }
        chatDto.setTime(LocalDateTime.now());
        msg.getMessages().add(chatDto);
        chattingRoomRepository.save(msg);
        return msg;
    }

    @Override
    public List<MyChatRoomListDto> getChatRoomList(String userId) {
        return friendRepository.findChatRoomIdByUserId(userId);
    }
}
