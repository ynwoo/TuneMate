package com.tunemate.tunemateplaylist.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import java.util.List;

@Getter
public class TrackCreateDto {

    @Schema(description = "추가할 노래의 uri",example = "spotify:track:sdifvi12490avnz")
    private List<String> uris;
    @Schema(description = "추가할 노래의 위치 (0으로 고정, 0이면 플레이리스트 최상단에 위치)",example = "0")
    private Integer position;

}
