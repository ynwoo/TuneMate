package com.tunemate.social.tunematesocial.dto;

import lombok.Getter;

@Getter
public class RelationRequestDto {

    private boolean accept;

    private String receiveUserId;

    private String requestUserId;

    private Long relationId;
}
