package com.tunemate.tunemateplaylist.dto;

import lombok.Getter;

@Getter
public class TrackChangeRequestDto {

    private Integer range_start;

    private Integer insert_before;

    private Integer range_length;
}
