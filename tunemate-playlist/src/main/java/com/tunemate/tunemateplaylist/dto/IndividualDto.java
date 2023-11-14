package com.tunemate.tunemateplaylist.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class IndividualDto {

    @Schema(description = "선택한 사람의 UUID",example = "XCVSDFg15g0b-asdfzC")
    private String userId;
    @Schema(description = "선택한 사람의 이름",example = "최유리")
    private String name;
    @Schema(description = "선택한 사람의 사진",example = "https://image.com")
    private String imageUrl;
    @Schema(description = "선택한 사람의 대표플레이리스트 ID",example = "CVD525AZREy")
    private String playlistId;
}
