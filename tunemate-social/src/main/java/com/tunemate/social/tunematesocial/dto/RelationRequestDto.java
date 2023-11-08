package com.tunemate.social.tunematesocial.dto;

import lombok.Getter;

@Getter
public class RelationRequestDto {

    private boolean accept;

    private String myUserId;

    private String requestUserId;

    private Long relationId;
}
