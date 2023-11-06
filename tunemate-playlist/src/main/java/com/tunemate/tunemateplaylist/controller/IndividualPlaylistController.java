package com.tunemate.tunemateplaylist.controller;

import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tunemate.tunemateplaylist.dto.PlaylistCreateDto;
import com.tunemate.tunemateplaylist.dto.PlaylistIdDto;
import com.tunemate.tunemateplaylist.dto.PlaylistResponseDto;
import com.tunemate.tunemateplaylist.dto.TrackChangeRequestDto;
import com.tunemate.tunemateplaylist.dto.TrackCreateDto;
import com.tunemate.tunemateplaylist.dto.TrackDeleteRequestDto;
import com.tunemate.tunemateplaylist.service.IndividualPlaylistService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(value = "*", allowedHeaders = "*")
@RequiredArgsConstructor
@RequestMapping("/individual")

public class IndividualPlaylistController {

    private final IndividualPlaylistService individualPlaylistService;
    //개인 플레이리스트 생성
    @PostMapping("playlists")
    @Operation(summary = "개인 플레이리스트 생성", description = "Spotify계정에 개인의 플레이리스트를 생성합니다.")
    public void createPlaylist(@RequestHeader("UserId") String userId, @RequestBody PlaylistCreateDto playlistCreateDto) throws ParseException {
        individualPlaylistService.createPlaylist(userId,playlistCreateDto);
    }

    //개인 플레이리스트 트랙 추가
    @PostMapping("playlists/{playlistId}/tracks")
    public void createTrack(@RequestHeader("UserId") String userId, @RequestBody TrackCreateDto trackCreateDto,@PathVariable("playlistId") String playlistId) throws ParseException {
        individualPlaylistService.createTrack(userId, trackCreateDto,playlistId);
    }

    //개인 대표 플레이리스트 조회
    @GetMapping("playlists-representative")
    public PlaylistResponseDto getIndividualPlaylist(@RequestHeader("UserId") String userId) throws ParseException {
        PlaylistResponseDto playlistResponseDto = individualPlaylistService.getIndividualPlaylist(userId);
        return playlistResponseDto;

    }

    //개인의 대표 플레이리스트 변경
    @PutMapping("playlists")
    public void setIndividualPlaylistId(@RequestHeader("UserId") String userId, @RequestBody PlaylistIdDto playlistIdDto){
        individualPlaylistService.setIndividualPlaylistId(userId,playlistIdDto);
    }

    //노래 재생 횟수 카운트
    @PostMapping("count")
    public void counting(@RequestHeader("UserId") String userId) throws ParseException {
        individualPlaylistService.counting(userId);
    }

    //개인 플레이리스트 트랙 삭제
    @DeleteMapping("playlists/{playlistId}/tracks")
    public void deleteTrack(@RequestHeader("UserId") String userId, @RequestBody TrackDeleteRequestDto trackDeleteRequestDto,@PathVariable("playlistId") String playlistId){
        individualPlaylistService.deleteTrack(userId, playlistId, trackDeleteRequestDto);

    }

    // 개인 플레이리스트 트랙 순서 변경
    @PutMapping("/playlists/{playlistId}/tracks")
    public void changeTrack(@RequestHeader("UserId") String userId, @RequestBody TrackChangeRequestDto trackChangeRequestDto,@PathVariable("playlistId") String playlistId){
        individualPlaylistService.changeTrack(userId, playlistId, trackChangeRequestDto);
    }

}
