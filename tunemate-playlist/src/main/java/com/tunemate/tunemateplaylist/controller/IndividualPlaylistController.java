package com.tunemate.tunemateplaylist.controller;

import com.tunemate.tunemateplaylist.dto.PlaylistCreateDto;
import com.tunemate.tunemateplaylist.dto.PlaylistIdDto;
import com.tunemate.tunemateplaylist.dto.PlaylistResponseDto;
import com.tunemate.tunemateplaylist.dto.TrackCreateDto;
import com.tunemate.tunemateplaylist.service.IndividualPlaylistServiceImpl;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(value = "*", allowedHeaders = "*")
@RequiredArgsConstructor
@RequestMapping("/individual")

public class IndividualPlaylistController {

    private final IndividualPlaylistServiceImpl individualPlaylistService;
    //개인 플레이리스트 생성
    @PostMapping("playlist")
    public void createPlaylist(@RequestHeader("UserId") long userId, @RequestBody PlaylistCreateDto playlistCreateDto) throws ParseException {
        individualPlaylistService.createPlaylist(userId,playlistCreateDto);
    }

    //개인 플레이리스트 트랙 추가
    @PostMapping("playlists/tracks")
    public void createTrack(@RequestHeader("UserId") long userId, @RequestBody TrackCreateDto trackCreateDto){
        individualPlaylistService.createTrack(userId, trackCreateDto);
    }

    //개인 대표 플레이리스트 조회
    @GetMapping("playlists-representative")
    public PlaylistResponseDto getIndividualPlaylist(@RequestHeader("UserId") long userId) throws ParseException {
        PlaylistResponseDto playlistResponseDto = individualPlaylistService.getIndividualPlaylist(userId);
        return playlistResponseDto;

    }

    //개인의 대표 플레이리스트 변경
    @PutMapping("playlists")
    public void setIndividualPlaylistId(@RequestHeader("UserId") long userId, @RequestBody PlaylistIdDto playlistIdDto){
        individualPlaylistService.setIndividualPlaylistId(userId,playlistIdDto);
    }

    //노래 재생 횟수 카운트
    @PostMapping("count")
    public void counting(@RequestHeader("UserId") long userId) throws ParseException {
        individualPlaylistService.counting(userId);
    }

}
