package com.tunemate.tunemateplaylist.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import com.tunemate.tunemateplaylist.dto.*;
import com.tunemate.tunemateplaylist.exception.NotFoundException;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.tunemate.tunemateplaylist.service.CommonPlaylistServiceImpl;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin(value = "*", allowedHeaders = "*")
@RequiredArgsConstructor
@RequestMapping("/common")
@Slf4j
public class CommonPlaylistController {

	private final CommonPlaylistServiceImpl commonPlaylistService;
	private final Map<String, List<SseEmitter>> SseEmitters = new ConcurrentHashMap<>();

	// 공동 플레이리스트 조회
	@GetMapping(value = "/playlists/{relationId}",produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	@Operation(summary = "공동 플레이리스트 조회", description = "공동 플레이리스트를 조회합니다.\n" +
		"공통 플리 조회는 PostMan에서 테스트(SSE라 그런듯?)")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "조회 성공."),
			@ApiResponse(responseCode = "403", description = "권한이 없습니다."),
			@ApiResponse(responseCode = "404", description = "공동 플레이리스트가 없습니다.")

	})
	public ResponseEntity<SseEmitter> getCommonPlaylist(@PathVariable("relationId") Long relationId,
		@RequestHeader("UserId") String userId) throws IOException {
		log.info("SSE 연결 요청");
		RelationInfoDto relationInfoDto = commonPlaylistService.getRelationInfo(relationId);
		grantCheck(relationInfoDto,userId);
		if(relationInfoDto.getPlaylistId() == null){ // 공통 플레이리스트를 생성하지 않은 경우
			throw new NotFoundException("공동 플레이리스트가 없습니다.",HttpStatus.NOT_FOUND);
		}
		String playlistId = relationInfoDto.getPlaylistId();
		SseEmitter sseEmitter = new SseEmitter(-1l);
		SseEmitters.computeIfAbsent(playlistId, k -> new ArrayList<>()).add(sseEmitter);
		// sse 연결 끝나면 객체 삭제
		sseEmitter.onCompletion(() -> {
			SseEmitters.get(playlistId).remove(sseEmitter);
		});
		// sse 연결 시간 초과 시 객체 삭제
		sseEmitter.onTimeout(() -> {
			SseEmitters.get(playlistId).remove(sseEmitter);
		});
		PlaylistResponseDto playlistResponseDto = commonPlaylistService.getIndividualPlaylist(userId, playlistId);
		sseEmitter.send(playlistResponseDto, MediaType.APPLICATION_JSON);
		return ResponseEntity.ok().header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_EVENT_STREAM_VALUE)
			.body(sseEmitter);
	}

	// 공동 플레이리스트 생성
	@PostMapping("/playlists")
	@Operation(summary = "공동 플레이리스트 생성", description = "공동 플레이리스트를 생성합니다.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "생성 성공."),
			@ApiResponse(responseCode = "403", description = "권한이 없습니다."),
			@ApiResponse(responseCode = "404", description = "공동 플레이리스트가 이미 존재합니다.")

	})
	public void createCommonPlaylist(@RequestHeader("UserId") String userId,
		@RequestBody PlaylistCreateDto playlistCreateDto) throws ParseException {
		RelationInfoDto relationInfoDto = commonPlaylistService.getRelationInfo(playlistCreateDto.getRelationId());
		grantCheck(relationInfoDto,userId);
		if(relationInfoDto.getPlaylistId() != null){ // 공통 플레이리스트를 생성하지 않은 경우
			throw new NotFoundException("공통 플레이리스트가 이미 존재합니다.",HttpStatus.BAD_REQUEST);
		}
		commonPlaylistService.createPlaylist(userId, playlistCreateDto);
	}

	private void updatePlaylistAndSendResponse(String userId, String playlistId) {
		PlaylistResponseDto playlistResponseDto = commonPlaylistService.getIndividualPlaylist(userId, playlistId);
		System.out.println(SseEmitters);
		int size = SseEmitters.get(playlistId).size();
		for (int i = 0; i < size; i++) {
			try {
				SseEmitters.get(playlistId).get(i).send(playlistResponseDto, MediaType.APPLICATION_JSON);
				log.info("연결된 사람에게 전송");

			} catch (IOException | IllegalStateException e) {
				SseEmitters.get(playlistId).remove(SseEmitters.get(playlistId).get(i));
				log.info("연결된 사람에게 전송 실패");
			} catch (NullPointerException e) {
				log.info("Null");
			}
		}

	}

	// 공동 플레이리스트에 트랙 추가
	@PostMapping("/playlists/{relationId}/tracks")
	@Operation(summary = "공동 플레이리스트 트랙 추가", description = "공동 플레이리스트에 트랙(곡)을 추가합니다.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "트랙 추가 성공."),
			@ApiResponse(responseCode = "403", description = "권한이 없습니다."),
			@ApiResponse(responseCode = "404", description = "친구 관계 기본키가 올바르지 않습니다.")

	})
	public void createTrack(@RequestHeader("UserId") String userId, @PathVariable("relationId") Long relationId,
		@RequestBody TrackCreateDto trackCreateDto) throws IOException, ParseException {
		RelationInfoDto relationInfoDto = commonPlaylistService.getRelationInfo(relationId);
		// 추가 하는 사람 userId 와 relationInfoDto 의 user1Id 와 user2Id 를 비교해서 일치하지 않으면 에러발생
		grantCheck(relationInfoDto,userId);
		commonPlaylistService.createTrack(userId, relationInfoDto.getPlaylistId(), trackCreateDto);
		updatePlaylistAndSendResponse(userId, relationInfoDto.getPlaylistId());

	}

	// 공동 플레이리스트에 트랙 삭제
	@DeleteMapping("/playlists/{relationId}/tracks")
	@Operation(summary = "공동 플레이리스트 트랙 삭제", description = "공동 플레이리스트에 트랙(곡)을 삭제합니다.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "삭제 성공."),
			@ApiResponse(responseCode = "403", description = "권한이 없습니다."),
			@ApiResponse(responseCode = "404", description = "친구 관계 기본키가 올바르지 않습니다.")

	})
	public void deleteTrack(@RequestHeader("UserId") String userId, @PathVariable("relationId") Long relationId,
		@RequestBody TrackDeleteRequestDto trackDeleteRequestDto) throws IOException {
		RelationInfoDto relationInfoDto = commonPlaylistService.getRelationInfo(relationId);
		grantCheck(relationInfoDto,userId);
		commonPlaylistService.deleteTrack(userId, relationInfoDto.getPlaylistId(), trackDeleteRequestDto);
		updatePlaylistAndSendResponse(userId, relationInfoDto.getPlaylistId());

	}

	// 공동 플레이리스트 트랙 순서 변경
	@PutMapping("/playlists/{playlistId}/tracks")
	@Operation(summary = "공동 플레이리스트 트랙 순서 변경", description = """
		공동 플레이리스트에 트랙(곡) 순서를 변경합니다.
		  
		"range_start": 1, // 선택한 노래의 인덱스
		  
		"insert_before": 3, // 삽입 위치 인덱스 (위에 있는 곡 아래로 내릴 때는 [삽입 위치 인덱스 + 1] 로 해주어야함)
		  
		"range_length": 1 // 1로 고정""")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "트랙 순서 변경 성공."),
			@ApiResponse(responseCode = "403", description = "권한이 없습니다."),
			@ApiResponse(responseCode = "404", description = "친구 관계 기본키가 올바르지 않습니다.")

	})
	public void changeTrack(@RequestHeader("UserId") String userId, @PathVariable("relationId") Long relationId,
		@RequestBody TrackChangeRequestDto trackChangeRequestDto) {
		RelationInfoDto relationInfoDto = commonPlaylistService.getRelationInfo(relationId);
		grantCheck(relationInfoDto,userId);
		commonPlaylistService.changeTrack(userId, relationInfoDto.getPlaylistId(), trackChangeRequestDto);
		updatePlaylistAndSendResponse(userId, relationInfoDto.getPlaylistId());
	}

	public void grantCheck(RelationInfoDto relationInfoDto, String userId){
		if(!relationInfoDto.getUser1Id().equals(userId) && !relationInfoDto.getUser2Id().equals(userId)){
			throw new NotFoundException("권한이 없습니다.", HttpStatus.FORBIDDEN);
		}
	}
}
