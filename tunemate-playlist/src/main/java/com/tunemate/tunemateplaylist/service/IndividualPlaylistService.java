package com.tunemate.tunemateplaylist.service;

import com.tunemate.tunemateplaylist.domain.Playlist;
import com.tunemate.tunemateplaylist.dto.PlaylistCreateDto;
import com.tunemate.tunemateplaylist.dto.PlaylistIdDto;
import com.tunemate.tunemateplaylist.dto.PlaylistResponseDto;
import com.tunemate.tunemateplaylist.dto.TrackCreateDto;
import org.json.simple.parser.ParseException;

public interface IndividualPlaylistService {

    void createPlaylist(long userId, PlaylistCreateDto playlistCreateDto) throws ParseException;

    void createTrack(long userId, TrackCreateDto trackCreateDto);

    PlaylistResponseDto getIndividualPlaylist(long userId) throws ParseException;

    void setIndividualPlaylistId(long userId, PlaylistIdDto playlistIdDto);
}
