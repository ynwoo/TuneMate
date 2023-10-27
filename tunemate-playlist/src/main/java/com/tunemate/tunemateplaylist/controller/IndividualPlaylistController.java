package com.tunemate.tunemateplaylist.controller;

import com.tunemate.tunemateplaylist.dto.*;
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
    @PostMapping("playlists/{playlistId}/tracks")
    public void createTrack(@RequestHeader("UserId") long userId, @RequestBody TrackCreateDto trackCreateDto,@PathVariable("playlistId") String playlistId){
        individualPlaylistService.createTrack(userId, trackCreateDto,playlistId);
    }

    //개인 대표 플레이리스트 조회
    @GetMapping("playlists-representative/{playlistId}")
    public PlaylistResponseDto getIndividualPlaylist(@RequestHeader("UserId") long userId,@PathVariable("playlistId") String playlistId) throws ParseException {
        PlaylistResponseDto playlistResponseDto = individualPlaylistService.getIndividualPlaylist(userId,playlistId);
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

    //개인 플레이리스트 트랙 삭제
    @DeleteMapping("playlists/{playlistId}/tracks")
    public void deleteTrack(@RequestHeader("UserID") long userId, @RequestBody TrackDeleteRequestDto trackDeleteRequestDto,@PathVariable("playlistId") String playlistId){
        individualPlaylistService.deleteTrack(playlistId,trackDeleteRequestDto);

    }

}
