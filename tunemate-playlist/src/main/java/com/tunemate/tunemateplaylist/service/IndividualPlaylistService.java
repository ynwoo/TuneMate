package com.tunemate.tunemateplaylist.service;

import com.tunemate.tunemateplaylist.domain.Playlist;
import com.tunemate.tunemateplaylist.dto.*;
import org.json.simple.parser.ParseException;

public interface IndividualPlaylistService {

    void createPlaylist(String userId, PlaylistCreateDto playlistCreateDto) throws ParseException;

    void createTrack(String userId, TrackCreateDto trackCreateDto, String playlistId) throws ParseException;

    PlaylistResponseDto getIndividualPlaylist(String userId) throws ParseException;

    void setIndividualPlaylistId(String userId, PlaylistIdDto playlistIdDto);

    void counting(String userId) throws ParseException;

    void deleteTrack(String userId, String playlistId, TrackDeleteRequestDto trackDeleteRequestDto);

    void changeTrack(String userId, String playlistId, TrackChangeRequestDto trackChangeRequestDto);

    boolean checkValid(String playlistId, String userId);

    IndividualDto getIndividualInfo(String userId, String selectUserId);
}
