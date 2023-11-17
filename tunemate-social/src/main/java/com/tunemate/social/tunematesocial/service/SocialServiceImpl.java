package com.tunemate.social.tunematesocial.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.tunemate.social.tunematesocial.client.MusicServiceClient;
import com.tunemate.social.tunematesocial.dto.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tunemate.social.tunematesocial.client.UserServiceClient;
import com.tunemate.social.tunematesocial.dto.request.FriendRequestDto;
import com.tunemate.social.tunematesocial.dto.request.PlaylistRequestDto;
import com.tunemate.social.tunematesocial.dto.response.MyFriendResponseDto;
import com.tunemate.social.tunematesocial.dto.response.ReceivedFriendRequestResponseDto;
import com.tunemate.social.tunematesocial.dto.response.RelationResponseDto;
import com.tunemate.social.tunematesocial.entity.ChatPerson;
import com.tunemate.social.tunematesocial.entity.ChattingRoom;
import com.tunemate.social.tunematesocial.entity.Friend;
import com.tunemate.social.tunematesocial.entity.FriendRequest;
import com.tunemate.social.tunematesocial.exception.BaseException;
import com.tunemate.social.tunematesocial.exception.code.SocialErrorCode;
import com.tunemate.social.tunematesocial.repository.ChatPersonRepository;
import com.tunemate.social.tunematesocial.repository.ChattingRoomRepository;
import com.tunemate.social.tunematesocial.repository.FriendRepository;
import com.tunemate.social.tunematesocial.repository.FriendRequestRepository;
import com.tunemate.social.tunematesocial.vo.MyFriendVo;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class SocialServiceImpl implements SocialService {
	private final FriendRepository friendRepository;
	private final FriendRequestRepository friendRequestRepository;
	private final UserServiceClient userServiceClient;
	private final ChattingRoomRepository chattingRoomRepository;
	private final ChatPersonRepository chatPersonRepository;
	private final MusicServiceClient musicServiceClient;

	@Autowired
	public SocialServiceImpl(FriendRepository friendRepository, FriendRequestRepository friendRequestRepository,
		UserServiceClient userServiceClient, ChattingRoomRepository chattingRoomRepository,
		ChatPersonRepository chatPersonRepository,MusicServiceClient musicServiceClient) {
		this.friendRepository = friendRepository;
		this.friendRequestRepository = friendRequestRepository;
		this.userServiceClient = userServiceClient;
		this.chattingRoomRepository = chattingRoomRepository;
		this.chatPersonRepository = chatPersonRepository;
		this.musicServiceClient = musicServiceClient;
	}

	@Override
	@Transactional
	public void addFriendRequest(String myId, FriendRequestDto friendRequestDto) {
		// 이미 친구 인지 확인
		Optional<Friend> relation1 = friendRepository.findByUser1IdAndAndUser2Id(myId,
			friendRequestDto.getUserId());

		Optional<Friend> relation2 = friendRepository.findByUser1IdAndAndUser2Id(
			friendRequestDto.getUserId(), myId);

		if (relation1.isPresent() || relation2.isPresent()) {
			throw new BaseException(SocialErrorCode.ALREADY_FRIEND);
		}
		// 이미 보낸 요청인지 확인
		Optional<FriendRequest> optionalFriendRequest = friendRequestRepository.findByRequestedUserIdAndRequestingUserId(
			friendRequestDto.getUserId(), myId);

		if (optionalFriendRequest.isPresent()) {
			throw new BaseException(SocialErrorCode.ALREADY_SENT_REQUEST);
		}

		// Dto -> Entity 변환
		FriendRequest friendRequest = FriendRequest.builder()
			.requestingUserId(myId)
			.requestedUserId(friendRequestDto.getUserId())
			.distance(friendRequestDto.getDistance())
			.musicalTasteSimilarity(friendRequestDto.getMusicalTasteSimilarity())
			.build();

		// repository 저장
		friendRequestRepository.save(friendRequest);

	}

	@Override
	public List<ReceivedFriendRequestResponseDto> getFriendRequests(String myId) {
		List<ReceivedFriendRequestResponseDto> result = new ArrayList<>();

		// 유저에게 온 친구신청 목록
		List<FriendRequest> byRequestedUserId = friendRequestRepository.findByRequestedUserId(myId);

		// 친구신청 한 유저들의 id 목록
		List<String> idList = byRequestedUserId.stream()
			.map(FriendRequest::getRequestingUserId)
			.collect(Collectors.toList());

		// 사용자 정보 리스트
		List<UserInfoDto> userInfoList = userServiceClient.getMembersByUserIdIn(idList);

		// 리스트 크기가 같다고 가정
		int size = byRequestedUserId.size();

		// 데이터 결합
		for (int i = 0; i < size; i++) {
			FriendRequest friendRequest = byRequestedUserId.get(i);
			UserInfoDto userInfo = userInfoList.get(i);

			ReceivedFriendRequestResponseDto responseDto = ReceivedFriendRequestResponseDto
				.builder()
				.userId(userInfo.getUserId())
				.name(userInfo.getName())
				.img(userInfo.getImageUrl())
				.distance(friendRequest.getDistance())
				.musicalTasteSimilarity(friendRequest.getMusicalTasteSimilarity())
				.build();

			// 결과 리스트에 추가
			result.add(responseDto);
		}

		return result;
	}

	@Override
	@Transactional
	public Long acceptFriendRequest(String myId, String newFriendId) {
		// 친구 요청 기록 가져오기
		Optional<FriendRequest> friendRequestOptional = friendRequestRepository.findByRequestedUserIdAndRequestingUserId(
			myId, newFriendId);

		if (friendRequestOptional.isEmpty()) {
			log.debug("해당하는 친구 요청이 없습니다.");
			throw new BaseException(SocialErrorCode.FRIEND_REQUEST_NOT_FOUND);
		}

		FriendRequest friendRequest = friendRequestOptional.get();

		// 친구 목록에 추가
		// Dto -> Entity 변환
		Friend friend = Friend.builder()
			.user1Id(myId)
			.user2Id(newFriendId)
			.distance(friendRequest.getDistance())
			.musicalTasteSimilarity(friendRequest.getMusicalTasteSimilarity())
			// 이후 공동 플리 생성 클릭 시, 생성된 플리id 저장
			.commonPlaylistId(null)
			.host(null)
			.build();

		// repository 저장
		friendRepository.save(friend);

		// 친구 신청 목록에서 제거
		friendRequestRepository.delete(friendRequest);

		friendRequestOptional = friendRequestRepository.findByRequestedUserIdAndRequestingUserId(
			newFriendId, myId);
		if (friendRequestOptional.isPresent()) {
			friendRequest = friendRequestOptional.get();
			friendRequestRepository.delete(friendRequest);
		}

		// 채팅 방 생성
		long relationId = friendRepository.findByUser1IdAndAndUser2Id(myId, newFriendId).get().getId();
		ChattingRoom chattingRoom = new ChattingRoom();
		chattingRoom.setChatRoomId(relationId);
		chattingRoom.setMessages(new ArrayList<>());
		chattingRoomRepository.save(chattingRoom);
		return relationId;
	}

	@Override
	@Transactional
	public void declineFriendRequest(String myId, String notFriendId) {
		Optional<FriendRequest> friendRequestOptional = friendRequestRepository.findByRequestedUserIdAndRequestingUserId(
			myId, notFriendId);

		if (friendRequestOptional.isEmpty()) {
			log.debug("해당하는 친구 요청이 없습니다.");
			throw new BaseException(SocialErrorCode.FRIEND_REQUEST_NOT_FOUND);
		}

		FriendRequest friendRequest = friendRequestOptional.get();
		// 친구 신청 목록에서 제거
		friendRequestRepository.delete(friendRequest);
	}

	@Override
	@Transactional
	public void addPlaylistIdAndHost(PlaylistRequestDto playlistRequestDto) {
		Optional<Friend> byId = friendRepository.findById(playlistRequestDto.getRelationId());

		if (byId.isEmpty()) {
			log.debug("해당하는 친구 관계가 없습니다.");
			throw new BaseException(SocialErrorCode.RELATION_ID_NOT_FOUND);
		}

		Friend friend = byId.get();
		friend.updatePlaylistIdAndHost(playlistRequestDto.getPlaylistId(), playlistRequestDto.getHost());
		friendRepository.save(friend);
	}

	@Override
	public List<MyFriendResponseDto> getMyFriends(String myId) {
		List<MyFriendResponseDto> result = new ArrayList<>();

		List<Friend> byUser1Id = friendRepository.findByUser1Id(myId);
		List<Friend> byUser2Id = friendRepository.findByUser2Id(myId);

		// 유저의 친구 목록
		List<MyFriendVo> myFriendVos = new ArrayList<>();

		for (Friend friend : byUser1Id) {
			MyFriendVo myFriendVo = MyFriendVo
				.builder()
				.relationId(friend.getId())
				.friendId(friend.getUser2Id())
				.commonPlayListId(friend.getCommonPlaylistId())
				.distance(friend.getDistance())
				.musicalTasteSimilarity(friend.getMusicalTasteSimilarity())
				.build();

			myFriendVos.add(myFriendVo);
		}

		for (Friend friend : byUser2Id) {
			MyFriendVo myFriendVo = MyFriendVo
				.builder()
				.relationId(friend.getId())
				.friendId(friend.getUser1Id())
				.commonPlayListId(friend.getCommonPlaylistId())
				.distance(friend.getDistance())
				.musicalTasteSimilarity(friend.getMusicalTasteSimilarity())
				.build();

			myFriendVos.add(myFriendVo);
		}
		myFriendVos.sort(Comparator.comparing(MyFriendVo::getFriendId));

		// friendId만을 추출하여 List<String> 만들기
		List<String> myFriendsIdList = new ArrayList<>();
		for (MyFriendVo friend : myFriendVos) {
			myFriendsIdList.add(friend.getFriendId());
		}

		// idList Feign: 유저의 id, name, image 정보 리스트
		List<UserInfoDto> userInfoList = userServiceClient.getMembersByUserIdIn(myFriendsIdList);

		// 리스트 크기가 같다고 가정
		int size = myFriendsIdList.size();

		// 데이터 결합
		for (int i = 0; i < size; i++) {
			UserInfoDto userInfo = userInfoList.get(i);
			FriendInfoDto friendInfoDto = musicServiceClient.getFriendInfo(myId,userInfo.getUserId());
			MyFriendResponseDto responseDto = MyFriendResponseDto
				.builder()
				.relationId(myFriendVos.get(i).getRelationId())
				.friendId(userInfo.getUserId())
				.name(userInfo.getName())
				.commonPlayListId(myFriendVos.get(i).getCommonPlayListId())
				.img(userInfo.getImageUrl())
				.distance(myFriendVos.get(i).getDistance())
				.musicalTasteSimilarity(myFriendVos.get(i).getMusicalTasteSimilarity())
					.friendPlaylistId(friendInfoDto.getPlaylistId())
				.build();

			// 결과 리스트에 추가
			result.add(responseDto);
		}

		return result;
	}

	@Override
	@Transactional
	public String getHostId(String playlistId) {
		Optional<Friend> byCommonPlaylistId = friendRepository.findByCommonPlaylistId(playlistId);
		if (byCommonPlaylistId.isEmpty()) {
			log.debug("해당 플레이리스트 아이디를 가진 친구 관계가 없습니다");
			throw new BaseException(SocialErrorCode.HOST_ID_NOT_FOUND);
		}

		// host Id 제공
		return byCommonPlaylistId.get().getHost();
	}

	@Override
	public ChattingListDto getChats(long relationId) {
		ChattingRoom chattingRoom = chattingRoomRepository.findByChatRoomId(relationId);
		ChattingListDto chattingListDto = new ChattingListDto();
		chattingListDto.setChatRoomId(chattingRoom.getChatRoomId());
		chattingListDto.setMessages(chattingRoom.getMessages());
		return chattingListDto;
	}

	@Override
	public void setChats(long relationId, String userId) {
		ChattingRoom chatRecord = chattingRoomRepository.findByChatRoomId(relationId);
		List<ChatDto> list = chatRecord.getMessages();
		for (int i = list.size() - 1; i >= 0; i--) {
			if (list.get(i).getReadCount() == 0)
				break;
			if (!list.get(i).getSenderNo().equals(userId)) {
				list.get(i).setReadCount(0);
			}
		}
		chatRecord.setMessages(list);
		chattingRoomRepository.save(chatRecord);
	}

	// 채팅방 접속 한 사람 DB에 저장
	@Override
	public void setChatPerson(long relationId, String userId) {
		Friend friend = friendRepository.findById(relationId).get();
		if (chatPersonRepository.findByFriendAndUserId(friend,userId) != null) return;
		ChatPerson chatPerson = ChatPerson.builder().userId(userId).friend(friend).build();
		chatPersonRepository.save(chatPerson);
	}

	@Override
	public void outChat(long relationId, String userId) {
		Friend friend = friendRepository.findById(relationId).get();
		ChatPerson chatPerson = chatPersonRepository.findByFriendAndUserId(friend, userId);
		chatPersonRepository.delete(chatPerson);
	}

	@Override
	public List<UserIdDto> getRequestUserId(String userId) {
		return friendRequestRepository.findByRequestingUserId(userId);
	}

	@Override
	public RelationResponseDto getRelationInfo(Long relationId) {
		Optional<Friend> byId = friendRepository.findById(relationId);
		if (byId.isEmpty()) {
			return null;
		}
		Friend friend = byId.get();

		return RelationResponseDto.builder()
			.relationId(friend.getId())
			.host(friend.getHost())
			.user1Id(friend.getUser1Id())
			.user2Id(friend.getUser2Id())
			.playlistId(friend.getCommonPlaylistId())
			.distance(friend.getDistance())
			.similarity(friend.getMusicalTasteSimilarity())
			.build();
	}

	@Override
	public void checkUser(Long relationId, String userId) {
		Optional<Friend> friend = friendRepository.findById(relationId);
		if (friend.isEmpty())
			throw new BaseException(SocialErrorCode.RELATION_ID_NOT_FOUND);
		if (!friend.get().getUser1Id().equals(userId) && !friend.get().getUser2Id().equals(userId))
			throw new BaseException(SocialErrorCode.NOT_AUTHORITY);
	}
}
