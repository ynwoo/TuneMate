package com.tunemate.social.tunematesocial.service;

import com.tunemate.social.tunematesocial.dto.ChatDto;
import com.tunemate.social.tunematesocial.dto.response.MyChatRoomListDto;
import com.tunemate.social.tunematesocial.entity.ChattingRoom;

import java.util.List;

public interface ChatService {
    ChattingRoom getChat(long relationId, ChatDto chatDto);

    List<MyChatRoomListDto> getChatRoomList(String userId);
}
