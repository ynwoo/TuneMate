package com.tunemate.tunemateplaylist.service;

import com.tunemate.tunemateplaylist.dto.PlaylistCreateDto;
import com.tunemate.tunemateplaylist.dto.PlaylistResponseDto;
import com.tunemate.tunemateplaylist.dto.RelationDto;
import com.tunemate.tunemateplaylist.dto.TrackCreateDto;
import org.json.simple.parser.ParseException;

public interface CommonPlaylistService {
    PlaylistResponseDto getIndividualPlaylist(String playlistId);

    void createPlaylist(PlaylistCreateDto playlistCreateDto) throws ParseException;

    void createTrack(String playlistId, TrackCreateDto trackCreateDto);

    RelationDto getRelationId(String playlistId);
}
