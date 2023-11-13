package com.tunemate.tunemateplaylist.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import java.util.List;

@Getter
public class TrackDeleteDto {

    @Schema(description = "노래의 스포티파이 uri",example = "spotify:track:vicnvisdfj315s")
    private String uri;
    @Schema(description = "플레이리스트에서 해당 노래의 위치(인덱스) 배열",example = "[0]")
    private List<Integer> positions;
}
