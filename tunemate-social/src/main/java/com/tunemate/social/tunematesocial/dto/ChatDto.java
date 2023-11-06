package com.tunemate.social.tunematesocial.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ChatDto {

    private String type;

    private String senderName;

    private Long senderNo;

    private String content;

    private LocalDateTime time;

    private Integer readCount;
}
