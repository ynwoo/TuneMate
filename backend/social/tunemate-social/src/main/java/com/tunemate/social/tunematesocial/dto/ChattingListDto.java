package com.tunemate.social.tunematesocial.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Data
public class ChattingListDto {

    @Schema(description = "채팅방(친구관계) 기본키",example = "3")
    private Long chatRoomId;
    @Schema(description = "채팅 기록")
    private List<ChatDto> messages;
}
