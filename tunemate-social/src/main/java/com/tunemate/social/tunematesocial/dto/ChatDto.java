package com.tunemate.social.tunematesocial.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class ChatDto {

    @Schema(description = "채팅방(친구관계) 기본키",example = "3")
    private Long relationId;
    @Schema(description = "채팅 보내는 사람의 이름",example = "김윤우")
    private String senderName;
    @Schema(description = "채팅 보내는 사람의 UUID",example = "43d70548-f69f-44cb-85f7-ad9b1e05f909")
    private String senderNo;
    @Schema(description = "채팅 메시지",example = "안녕")
    private String content;
    @Schema(description = "채팅 보낸 시간",example = "2020-12-12 11:11:11")
    private LocalDateTime time;
    @Schema(description = "채팅 읽음 확인",example = "1")
    private Integer readCount;
}
