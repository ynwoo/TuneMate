package com.tunemate.tunemateplaylist.controller;

import com.tunemate.tunemateplaylist.dto.*;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.parser.ParseException;
import org.springframework.web.ErrorResponse;
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

import com.tunemate.tunemateplaylist.service.IndividualPlaylistService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@CrossOrigin(value = "*", allowedHeaders = "*")
@RequiredArgsConstructor
@RequestMapping("/individual")
@Slf4j
public class IndividualPlaylistController {

	private final IndividualPlaylistService individualPlaylistService;

	//개인 플레이리스트 생성
	@PostMapping("playlists")
	@Operation(summary = "개인 플레이리스트 생성", description = "Spotify계정에 개인의 플레이리스트를 생성합니다.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "생성 성공")
	})
	public void createPlaylist(@RequestHeader("UserId") String userId,
		@RequestBody PlaylistCreateDto playlistCreateDto) throws ParseException {
		log.info(userId+" 사용자 개인 플레이리스트 생성 요청합니다.");
		individualPlaylistService.createPlaylist(userId, playlistCreateDto);
	}

	//개인 플레이리스트 트랙 추가
	@PostMapping("playlists/{playlistId}/tracks")
	@Operation(summary = "개인 플레이리스트 트랙 추가", description = "개인의 플레이리스트에 트랙(곡)을 추가합니다.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "트랙 추가 성공."),
			@ApiResponse(responseCode = "400", description = "개인 플레이리스트에 해당 노래가 이미 있습니다."),
			@ApiResponse(responseCode = "403", description = "권한이 없습니다."),
			@ApiResponse(responseCode = "404", description = "플레이리스트가 없습니다.")

	})
	public void createTrack(@RequestHeader("UserId") String userId, @RequestBody TrackCreateDto trackCreateDto,
		@PathVariable("playlistId") String playlistId) throws ParseException {
		log.info("{} 사용자 개인 플레이리스트 트랙 추가 요청합니다. Dto 내용 : {}", userId,trackCreateDto);
		individualPlaylistService.checkValid(playlistId,userId);
		individualPlaylistService.createTrack(userId, trackCreateDto, playlistId);
	}

	//개인 대표 플레이리스트 조회
	@GetMapping("playlists-representative")
	@Operation(summary = "개인 대표 플레이리스트 조회", description = "개인의 대표 플레이리스트를 조회합니다.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "조회 성공.")

	})
	public PlaylistResponseDto getIndividualPlaylist(@RequestHeader("UserId") String userId) throws ParseException {
		log.info("{} 사용자 개인 플레이리스트 조회 요청합니다.", userId);
		PlaylistResponseDto playlistResponseDto = individualPlaylistService.getIndividualPlaylist(userId);
		return playlistResponseDto;

	}

	//개인의 대표 플레이리스트 변경
	@PutMapping("playlists")
	@Operation(summary = "개인의 대표 플레이리스트 변경", description = "자신의 대표 플레이리스트를 설정합니다.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "변경(설정) 성공.")

	})
	public void setIndividualPlaylistId(@RequestHeader("UserId") String userId,
		@RequestBody PlaylistIdDto playlistIdDto) {
		log.info("{} 사용자 개인 플레이리스트를 변경 요청합니다. Dto 내용 : {}", userId,playlistIdDto);
		individualPlaylistService.setIndividualPlaylistId(userId, playlistIdDto);
	}

	//노래 재생 횟수 카운트
	@PostMapping("count")
	@Operation(summary = "노래 재생 횟수 카운트", description = "노래 재생 횟수를 카운트합니다.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "카운트 성공.")

	})
	public void counting(@RequestHeader("UserId") String userId) throws ParseException {
		log.info("{} 사용자가 듣는 노래 카운트 요청합니다.", userId);
		individualPlaylistService.counting(userId);
	}

	//개인 플레이리스트 트랙 삭제
	@DeleteMapping("playlists/{playlistId}/tracks")
	@Operation(summary = "개인 플레이리스트 트랙 삭제", description = "개인 플레이리스트에 트랙(곡)을 삭제합니다.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "삭제 성공."),
			@ApiResponse(responseCode = "403", description = "권한이 없습니다."),
			@ApiResponse(responseCode = "404", description = "플레이리스트가 없습니다.")

	})
	public void deleteTrack(@RequestHeader("UserId") String userId,
		@RequestBody TrackDeleteRequestDto trackDeleteRequestDto, @PathVariable("playlistId") String playlistId) {
		log.info("{} 사용자 개인 플레이리스트에 담긴 노래를 삭제 요청합니다. Dto 내용 : {}", userId,trackDeleteRequestDto);
		individualPlaylistService.checkValid(playlistId,userId);
		individualPlaylistService.deleteTrack(userId, playlistId, trackDeleteRequestDto);

	}

	// 개인 플레이리스트 트랙 순서 변경
	@PutMapping("/playlists/{playlistId}/tracks")
	@Operation(summary = "개인 플레이리스트 트랙 순서 변경", description = """
		개인 플레이리스트에 트랙(곡) 순서를 변경합니다.
		  
		"range_start": 1, // 선택한 노래의 인덱스
		  
		"insert_before": 3, // 삽입 위치 인덱스 (위에 있는 곡 아래로 내릴 때는 [삽입 위치 인덱스 + 1] 로 해주어야함)
		  
		"range_length": 1 // 1로 고정""")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "순서 변경 성공."),
			@ApiResponse(responseCode = "403", description = "권한이 없습니다."),
			@ApiResponse(responseCode = "404", description = "플레이리스트가 없습니다.")

	})
	public void changeTrack(@RequestHeader("UserId") String userId,
		@RequestBody TrackChangeRequestDto trackChangeRequestDto, @PathVariable("playlistId") String playlistId) {
		log.info("{} 사용자 개인 플레이리스트({}) 에 담긴 노래 위치를 변경 요청합니다. Dto 내용 : {}", userId,playlistId,trackChangeRequestDto);
		individualPlaylistService.checkValid(playlistId,userId);
		individualPlaylistService.changeTrack(userId, playlistId, trackChangeRequestDto);
	}

	// 선택한 사람의 정보를 조회
	@GetMapping("/info/{userId}")
	@Operation(summary = "선택한 사람의 정보를 조횝합니다.", description = """
		추천 또는 친구의 UUID, 사진, 이름, 대표 플레이리스트에 대한 정보를 조회합니다.""")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "조회 성공."),
			@ApiResponse(responseCode = "404", description = "해당 사용자가 없습니다.")

	})
	public IndividualDto getIndividualInfo(@RequestHeader("UserId") String userId, @PathVariable("userId") String selectUserId){
		log.info("{} 사용자가 {} 사용자의 정보를 조회합니다.", userId,selectUserId);
		return individualPlaylistService.getIndividualInfo(userId,selectUserId);
	}

}
