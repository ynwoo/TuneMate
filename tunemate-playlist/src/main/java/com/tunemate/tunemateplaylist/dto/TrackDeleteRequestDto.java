package com.tunemate.tunemateplaylist.dto;

import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class TrackDeleteRequestDto {
    private List<TrackDeleteDto> tracks;
}
