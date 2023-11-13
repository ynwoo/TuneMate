package com.tunemate.tunemateplaylist.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class ImageDto {
    private Integer height;
    @Schema(description = "노래 이미지 url",example = "https://vicjskncxi.com")
    private String url;
    private Integer width;
}
