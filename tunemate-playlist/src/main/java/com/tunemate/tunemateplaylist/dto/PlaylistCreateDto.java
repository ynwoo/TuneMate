package com.tunemate.tunemateplaylist.dto;

import lombok.Getter;


@Getter
public class PlaylistCreateDto {

    private String name;
    private String description;
    private boolean open;
}
