package com.tunemate.tunemateplaylist.dto;

import lombok.Getter;


@Getter
public class PlaylistRequestDto {

    private long relationId;

    private String name;

    private String description;

    private boolean open;
}
