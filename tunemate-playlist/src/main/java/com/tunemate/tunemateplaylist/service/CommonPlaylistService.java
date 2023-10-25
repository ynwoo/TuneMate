package com.tunemate.tunemateplaylist.service;

import com.tunemate.tunemateplaylist.dto.PlaylistResponseDto;

public interface CommonPlaylistService {
    PlaylistResponseDto getIndividualPlaylist(String playlistId);
}
