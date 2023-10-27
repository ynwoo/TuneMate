package com.tunemate.tunemateplaylist.service;

import com.tunemate.tunemateplaylist.dto.PlaylistCreateDto;
import com.tunemate.tunemateplaylist.dto.PlaylistResponseDto;
import org.json.simple.parser.ParseException;

public interface CommonPlaylistService {
    PlaylistResponseDto getIndividualPlaylist(String playlistId);

    void createPlaylist(PlaylistCreateDto playlistCreateDto) throws ParseException;
}
