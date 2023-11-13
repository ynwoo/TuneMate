package com.tunemate.tunemateplaylist.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class ArtistDto {

    @Schema(description = "가수 이름",example = "최유리")
    private String name;
}
