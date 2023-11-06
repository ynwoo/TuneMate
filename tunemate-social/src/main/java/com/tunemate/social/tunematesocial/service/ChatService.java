package com.tunemate.social.tunematesocial.service;

import com.tunemate.social.tunematesocial.dto.ChatDto;
import com.tunemate.social.tunematesocial.entity.ChattingRoom;

public interface ChatService {
    ChattingRoom getChat(long relationId, ChatDto chatDto);
}
