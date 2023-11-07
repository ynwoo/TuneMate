package com.tunemate.social.tunematesocial.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ChatDto {

    private Long relationId;

    private String senderName;

    private String senderNo;

    private String content;

    private LocalDateTime time;

    private Integer readCount;
}
