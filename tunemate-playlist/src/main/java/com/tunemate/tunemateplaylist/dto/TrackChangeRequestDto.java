package com.tunemate.tunemateplaylist.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class TrackChangeRequestDto {

    @Schema(description = "선택한 노래의 인덱스",example = "0")
    private Integer range_start;
    @Schema(description = "삽입 위치 인덱스 (위에 있는 곡 아래로 내릴 때는 [삽입 위치 인덱스 + 1] 로 해주어야함)",example = "2")
    private Integer insert_before;
    @Schema(description = "1로 고정",example = "1")
    private Integer range_length;
}
