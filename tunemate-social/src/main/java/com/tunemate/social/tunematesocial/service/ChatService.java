package com.tunemate.social.tunematesocial.service;

import com.tunemate.social.tunematesocial.dto.ChatDto;
import com.tunemate.social.tunematesocial.entity.Message;

public interface ChatService {
    Message getChat(long relationId, ChatDto chatDto);
}
