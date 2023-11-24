package com.tunemate.tunemateplaylist.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.ToString;


@Getter
@ToString
public class PlaylistCreateDto {

    @Schema(description = "친구 관계의 기본키(개인 플레이리스트 생성 시에는 필요없음)",example = "5")
    private long relationId;
    @Schema(description = "플레이리스트 이름",example = "A603의 플레이리스트")
    private String name;
    @Schema(description = "플레이리스트에 대한 설명",example = "지하철에서 듣기 좋은 노래들")
    private String description;
    @Schema(description = "플레이리스트 공개 여부(true 로 고정)",example = "true")
    private boolean open;
}
