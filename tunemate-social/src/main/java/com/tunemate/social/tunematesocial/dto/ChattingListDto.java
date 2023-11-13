package com.tunemate.social.tunematesocial.dto;

import lombok.Data;

import java.util.List;

@Data
public class ChattingListDto {

    private Long chatRoomId;

    private List<ChatDto> messages;
}
