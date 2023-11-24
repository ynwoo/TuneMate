package com.tunemate.social.tunematesocial.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.tunemate.social.tunematesocial.dto.ChattingListDto;
import com.tunemate.social.tunematesocial.dto.request.FriendRequestDto;
import com.tunemate.social.tunematesocial.dto.request.PlaylistRequestDto;
import com.tunemate.social.tunematesocial.dto.response.MyChatRoomListDto;
import com.tunemate.social.tunematesocial.dto.response.MyFriendResponseDto;
import com.tunemate.social.tunematesocial.dto.response.ReceivedFriendRequestResponseDto;
import com.tunemate.social.tunematesocial.dto.response.RelationIdResponseDto;
import com.tunemate.social.tunematesocial.dto.response.RelationResponseDto;
import com.tunemate.social.tunematesocial.service.ChatService;
import com.tunemate.social.tunematesocial.service.SocialService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin(value = "*", allowedHeaders = "*")
@Slf4j
@Tag(name = "social", description = "소셜 API")
public class SocialController {
	private final SocialService socialService;
	private final ChatService chatService;

	@Autowired
	public SocialController(SocialService socialService, ChatService chatService) {
		this.socialService = socialService;
		this.chatService = chatService;
	}

	@PostMapping("/friend-request")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "신청 성공."),
		@ApiResponse(responseCode = "400", description = "이미 친구입니다.",
			content = @Content(
				schema = @Schema(implementation = com.tunemate.social.tunematesocial.exception.ErrorResponse.class))),
		@ApiResponse(responseCode = "409", description = "이미 보낸 요청입니다.",
			content = @Content(
				schema = @Schema(implementation = com.tunemate.social.tunematesocial.exception.ErrorResponse.class)))
	})
	@Operation(summary = "친구 신청", description = """
		선택한 친구에게 친구 요청을 보냅니다.""")
	public ResponseEntity<?> addFriendRequest(@RequestBody FriendRequestDto friendRequestDto,
		@RequestHeader("UserId") String userId) {
		log.debug("친구 요청");
		log.debug("요청 정보" + friendRequestDto);
		socialService.addFriendRequest(userId, friendRequestDto);

		return ResponseEntity.ok().build();
	}

	@GetMapping("/friend-requests")
	@Operation(summary = "받은 친구 요청 목록 조회", description = """
		나에게 온 친구 요청 목록을 조회합니다.""")
	public ResponseEntity<?> getFriendRequests(@RequestHeader("UserId") String userId) {
		log.debug("친구 요청 목록 조회");

		List<ReceivedFriendRequestResponseDto> friendRequests = socialService.getFriendRequests(userId);

		return ResponseEntity.ok(friendRequests);
	}

	@PostMapping("/acceptance/{userId}")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "요청 수락 성공."),
		@ApiResponse(responseCode = "404", description = "존재하지 않는 요청입니다.",
			content = @Content(
				schema = @Schema(implementation = com.tunemate.social.tunematesocial.exception.ErrorResponse.class)))
	})
	@Operation(summary = "친구 요청 수락", description = """
		친구 요청을 수락하여 친구가 되는 기능입니다.""")
	public ResponseEntity<?> acceptFriendRequest(@PathVariable("userId") String newFriendId,
		@RequestHeader("UserId") String userId) {
		log.debug(userId + "님이 " + newFriendId + "님의 친구 요청을 수락");

		Long relationId = socialService.acceptFriendRequest(userId, newFriendId);

		RelationIdResponseDto result = RelationIdResponseDto.builder()
			.relationId(relationId)
			.build();
		return ResponseEntity.ok(result);
	}

	@PostMapping("/decline/{userId}")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "요청 거절 성공."),
		@ApiResponse(responseCode = "404", description = "존재하지 않는 친구 요청입니다.")
	})
	@Operation(summary = "친구 요청 거절", description = """
		친구 요청을 거절하는 기능입니다.""")
	public ResponseEntity<?> declineFriendRequest(@PathVariable("userId") String notFriendId,
		@RequestHeader("UserId") String userId) {
		log.debug(userId + "님이 " + notFriendId + "님의 친구 요청을 거절");

		socialService.declineFriendRequest(userId, notFriendId);

		return ResponseEntity.ok().build();
	}

	@PostMapping("/common-playlist")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "요청 성공."),
		@ApiResponse(responseCode = "404", description = "해당 친구관계가 없습니다.")
	})
	@Operation(summary = "플리id 및 host 정보 저장", description = """
		마이크로 서비스간 통신용""")
	public ResponseEntity<?> addCommonPlayListInfo(@RequestBody PlaylistRequestDto playlistRequestDto) {
		log.debug("플레이리스트 id 및 host 정보를 저장합니다.");

		socialService.addPlaylistIdAndHost(playlistRequestDto);

		return ResponseEntity.ok().build();
	}

	@GetMapping("/friends")
	@Operation(summary = "친구 목록 조회", description = """
		친구 목록을 조회합니다.""")
	public ResponseEntity<?> getMyFriends(
		@RequestHeader("UserId") String userId) {
		log.debug("나의 친구 목록을 불러옵니다.");

		List<MyFriendResponseDto> myFriends = socialService.getMyFriends(userId);

		return ResponseEntity.ok(myFriends);
	}

	@GetMapping("/host/{playlistId}")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "요청 성공."),
		@ApiResponse(responseCode = "404", description = "해당 플레이리스트의 host가 없습니다.")
	})
	@Operation(summary = "Host Id 제공", description = """
		playlist id를 받으면 그 플레이 리스트에 해당하는 host id를 제공합니다.
				
		마이크로 서비스간 통신용""")
	public String getHostId(@PathVariable("playlistId") String playlistId) {
		return socialService.getHostId(playlistId);
	}

	@GetMapping("/relation/{relationId}")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "요청 성공."),
		@ApiResponse(responseCode = "404", description = "해당 친구관계가 없습니다.")
	})
	@Operation(summary = "relationId로 relation 조회", description = """
		relationId를 받고 해당 relation이 존재하면 해당 친구 관계의 정보, 없으면 NOT_FOUND를 반환합니다.
				
		마이크로 서비스간 통신용""")
	public ResponseEntity<?> getRelationById(@PathVariable("relationId") Long relationId) {
		RelationResponseDto relationInfo = socialService.getRelationInfo(relationId);
		if (relationInfo == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		return ResponseEntity.ok(relationInfo);
	}

	/**
	 * 채팅 기록을 보여줍니다.
	 */
	@GetMapping("/chats/{relationId}")
	@Operation(summary = "채팅 기록 조회", description = """
		채팅 기록을 조회합니다.""")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "채팅 기록 조회 성공."),
		@ApiResponse(responseCode = "403", description = "relationId 에 포함되지 않은 사람이 채팅 기록을 조회 하는 경우"),
		@ApiResponse(responseCode = "404", description = "relationId 가 없는 경우")
	})
	public ResponseEntity<ChattingListDto> getChatRecord(@RequestHeader("UserId") String userId,
		@PathVariable("relationId") Long relationId) {
		log.info("{} 사람이 {} 번 채팅 방의 채팅 기록을 요청",userId,relationId);
		socialService.checkUser(relationId, userId);
//		socialService.setChats(relationId, userId);
		return ResponseEntity.ok(socialService.getChats(relationId));
	}

	/**
	 * 채팅방 입장
	 */
	@PostMapping("/chat-in/{relationId}")
	@Operation(summary = "채팅방 입장", description = """
		채팅 방을 입장 할 때 요청하는 API.""")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "입장 성공."),
			@ApiResponse(responseCode = "403", description = "relationId 에 포함되지 않은 사람이 입장 하는 경우"),
			@ApiResponse(responseCode = "404", description = "relationId 가 없는 경우")
	})
	public void chatIn(@RequestHeader("UserId") String userId, @PathVariable("relationId") Long relationId ){
		log.info("{} 사람이 {} 번 채팅 방을 입장하는 요청",userId,relationId);
		socialService.checkUser(relationId, userId);
		socialService.setChats(relationId, userId);
		socialService.setChatPerson(relationId,userId);
	}

	/**
	 * 채팅 방 퇴장 (채팅 방 화면에서 다른 화면으로 전환).
	 */
	@DeleteMapping("/chat-out/{relationId}")
	@Operation(summary = "채팅방 퇴장(채팅 방 화면에서 다른 화면으로 전환)", description = """
		채팅 방을 나갈 때 요청하는 API.""")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "퇴장 성공."),
		@ApiResponse(responseCode = "403", description = "relationId 에 포함되지 않은 사람이 퇴장 하는 경우"),
		@ApiResponse(responseCode = "404", description = "relationId 가 없는 경우")
	})
	public void chatOut(@RequestHeader("UserId") String userId, @PathVariable("relationId") Long relationId) {
		log.info("{} 사람이 {} 번 채팅 방을 퇴장하는 요청",userId,relationId);
		socialService.checkUser(relationId, userId);
		socialService.outChat(relationId, userId);
	}

	/**
	 * 내가 속한 채팅방 목록 조회
	 */
	@GetMapping("/my-chats")
	@Operation(summary = "내가 속한 채팅방 목록 조회", description = """
		로그인 시 웹소켓 연결 및 토픽 구독을 위한 채팅방 목록.""")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "조회 성공."),
	})
	public ResponseEntity<List<MyChatRoomListDto>> myChats(@RequestHeader("UserId") String userId) {
		log.info("{} 사람이 속한 채팅방 목록을 조회하는 요청",userId);
		return ResponseEntity.ok(chatService.getChatRoomList(userId));
	}

	/**
	 * 내가 친구요청 보낸 사람들의 아이디 조회
	 */
	@GetMapping("/requests/friends")
	@Operation(summary = "내가 친구요청 보낸 사람들의 아이디 조회", description = """
		내가 친구요청 보낸 사람들의 아이디 조회.""")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "조회 성공."),
	})

	public ResponseEntity<?> getRequestUserId(@RequestHeader("UserId") String userId) {
		log.info("{} 사람이 친구 요청을 보낸 사람들의 이이디를 조회하는 요청",userId);
		return ResponseEntity.ok(socialService.getRequestUserId(userId));
	}

}
