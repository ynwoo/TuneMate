package com.tunemate.tunemateplaylist.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import java.util.List;

@Getter
public class TrackInfoDto {

    private List<ArtistDto> artists;
    @Schema(description = "노래의 스포티파이 ID",example = "sdifvi12490avnz")
    private String id;
    private AlbumDto album;
    @Schema(description = "노래 제목",example = "동그라미")
    private String name;
    @Schema(description = "스포티파이에서 제공하는 노래의 uri",example = "spotify:track:sdifvi12490avnz")
    private String uri;
}
