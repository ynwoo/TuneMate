package com.tunemate.tunemateplaylist.controller;

import com.tunemate.tunemateplaylist.dto.PlaylistCreateDto;
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

}
