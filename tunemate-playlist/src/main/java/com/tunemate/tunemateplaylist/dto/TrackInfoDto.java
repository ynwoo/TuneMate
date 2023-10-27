package com.tunemate.tunemateplaylist.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class TrackInfoDto {

    private List<ArtistDto> artists;

    private String id;

    private AlbumDto album;

    private String name;

    private String uri;
}
