package com.tunemate.tunemateplaylist.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import java.util.List;

@Getter
public class PlaylistResponseDto {

    @Schema(description = "플레이리스트에 대한 설명",example = "지하철에서 듣기 좋은 노래들")
    private String description;
    @Schema(description = "스포티파이에서 제공하는 플레이리스트 ID",example = "13c8YEl53PP7tZxuWGmyaq")
    private String id;
    @Schema(description = "플레이리스트 이미지")
    private List<ImageDto> images;
    @Schema(description = "플레이리스트 이름",example = "A603의 플레이리스트")
    private String name;
    @Schema(description = "플레이리스트에 들어있는 노래들")
    private TracksDto tracks;
}
