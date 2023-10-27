package com.tunemate.tunemateplaylist.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class TrackDeleteRequestDto {
    private List<TrackDeleteDto> tracks;
}
