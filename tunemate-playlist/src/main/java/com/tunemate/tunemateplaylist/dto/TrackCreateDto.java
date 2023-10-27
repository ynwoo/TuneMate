package com.tunemate.tunemateplaylist.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class TrackCreateDto {

    private List<String> uris;

    private Integer position;

}
