package com.tunemate.tunemateplaylist.service;

import com.tunemate.tunemateplaylist.dto.PlaylistCreateDto;
import org.json.simple.parser.ParseException;

public interface IndividualPlaylistService {

    void createPlaylist(long userId, PlaylistCreateDto playlistCreateDto) throws ParseException;
}
