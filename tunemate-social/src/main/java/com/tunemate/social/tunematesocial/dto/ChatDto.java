package com.tunemate.social.tunematesocial.dto;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ChatDto {

    private String type;

    private String senderName;

    private Long senderNo;

    private String content;

    private String time;

    private Integer readCount;
}
