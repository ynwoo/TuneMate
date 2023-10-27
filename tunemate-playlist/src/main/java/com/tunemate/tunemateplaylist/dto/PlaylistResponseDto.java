package com.tunemate.tunemateplaylist.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class PlaylistResponseDto {

    private String description;

    private String id;

    private List<ImageDto> images;

    private String name;

    private TracksDto tracks;
}
