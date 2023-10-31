package com.tunemate.tunemateplaylist.service;

import com.tunemate.tunemateplaylist.dto.*;
import org.json.simple.parser.ParseException;

public interface CommonPlaylistService {
    PlaylistResponseDto getIndividualPlaylist(String playlistId);

    void createPlaylist(PlaylistCreateDto playlistCreateDto) throws ParseException;

    void createTrack(String playlistId, TrackCreateDto trackCreateDto) throws ParseException;

    RelationDto getRelationId(String playlistId);

    void deleteTrack(String playlistId, TrackDeleteRequestDto trackDeleteRequestDto);

    void changeTrack(String playlistId, TrackChangeRequestDto trackChangeRequestDto);
}
