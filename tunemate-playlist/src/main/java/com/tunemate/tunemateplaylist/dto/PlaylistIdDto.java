package com.tunemate.tunemateplaylist.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class PlaylistIdDto {

    @Schema(description = "변경할 플레이리스트의  ID",example = "7j4jTVc8KxSO6h8huSEvX7")
    private String playlistId;
}
