package com.tunemate.tunemateplaylist.dto;

import lombok.Getter;

@Getter
public class RelationInfoDto {

    private Long relationId;

    private String host;

    private String user1Id;

    private String user2Id;

    private String playlistId;

    private String distance;

    private String similarity;
}
