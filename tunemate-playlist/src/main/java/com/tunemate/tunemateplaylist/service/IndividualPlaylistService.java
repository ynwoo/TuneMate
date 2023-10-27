package com.tunemate.tunemateplaylist.service;

import com.tunemate.tunemateplaylist.domain.Playlist;
import com.tunemate.tunemateplaylist.dto.*;
import org.json.simple.parser.ParseException;

public interface IndividualPlaylistService {

    void createPlaylist(long userId, PlaylistCreateDto playlistCreateDto) throws ParseException;

    void createTrack(long userId, TrackCreateDto trackCreateDto, String playlistId);

    PlaylistResponseDto getIndividualPlaylist(long userId) throws ParseException;

    void setIndividualPlaylistId(long userId, PlaylistIdDto playlistIdDto);

    void counting(long userId) throws ParseException;

    void deleteTrack(String playlistId, TrackDeleteRequestDto trackDeleteRequestDto);

    void changeTrack(String playlistId, TrackChangeRequestDto trackChangeRequestDto);
}
