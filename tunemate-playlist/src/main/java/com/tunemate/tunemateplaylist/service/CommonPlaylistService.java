package com.tunemate.tunemateplaylist.service;

import com.tunemate.tunemateplaylist.dto.*;
import org.json.simple.parser.ParseException;

public interface CommonPlaylistService {
    PlaylistResponseDto getIndividualPlaylist(String userId,String playlistId);

    void createPlaylist(String userId,PlaylistCreateDto playlistCreateDto) throws ParseException;

    void createTrack(String userId,String playlistId, TrackCreateDto trackCreateDto) throws ParseException;

    RelationDto getRelationId(String playlistId);

    void deleteTrack(String userId,String playlistId, TrackDeleteRequestDto trackDeleteRequestDto);

    void changeTrack(String userId,String playlistId, TrackChangeRequestDto trackChangeRequestDto);

    RelationInfoDto getRelationInfo(long relationId);
}
