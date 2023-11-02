package com.tunemate.social.tunematesocial.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tunemate.social.tunematesocial.client.UserServiceClient;
import com.tunemate.social.tunematesocial.dto.UserInfoDto;
import com.tunemate.social.tunematesocial.dto.request.FriendRequestDto;
import com.tunemate.social.tunematesocial.dto.request.PlaylistRequestDto;
import com.tunemate.social.tunematesocial.dto.response.MyFriendResponseDto;
import com.tunemate.social.tunematesocial.dto.response.ReceivedFriendRequestResponseDto;
import com.tunemate.social.tunematesocial.entity.Friend;
import com.tunemate.social.tunematesocial.entity.FriendRequest;
import com.tunemate.social.tunematesocial.repository.FriendRepository;
import com.tunemate.social.tunematesocial.repository.FriendRequestRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class SocialServiceImpl implements SocialService {
	private final FriendRepository friendRepository;
	private final FriendRequestRepository friendRequestRepository;
	private final UserServiceClient userServiceClient;

	@Autowired
	public SocialServiceImpl(FriendRepository friendRepository, FriendRequestRepository friendRequestRepository,
		UserServiceClient userServiceClient) {
		this.friendRepository = friendRepository;
		this.friendRequestRepository = friendRequestRepository;
		this.userServiceClient = userServiceClient;
	}

	/**
	 * 친구 신청
	 * @param friendRequestDto
	 */
	@Override
	public void addFriendRequest(String myId, FriendRequestDto friendRequestDto) {
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
		// log.debug("내게 친구 신청한 사용자 아이디 리스트 : " + idList);

		// 범수가 idList Feign으로 가져가서 여기에 유저의 id, name, image 정보 리스트 가져다 줄꺼임
		// 사용자 정보 리스트
		List<UserInfoDto> userInfoList = userServiceClient.getMembersByUserIdIn(idList);

		// log.debug("내게 친구 신청한 사용자 정보 리스트 : " + userInfoList);

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
	public void acceptFriendRequest(String myId, String newFriendId) {
		// 친구 요청 기록 가져오기
		Optional<FriendRequest> friendRequestOptional = friendRequestRepository.findByRequestedUserIdAndRequestingUserId(
			myId, newFriendId);

		if (friendRequestOptional.isEmpty()) {
			log.debug("해당하는 친구 요청이 없습니다.");
			return;
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
	}

	@Override
	public void declineFriendRequest(String myId, String notFriendId) {
		Optional<FriendRequest> friendRequestOptional = friendRequestRepository.findByRequestedUserIdAndRequestingUserId(
			myId, notFriendId);

		if (friendRequestOptional.isEmpty()) {
			log.debug("해당하는 친구 요청이 없습니다.");
			return;
		}

		FriendRequest friendRequest = friendRequestOptional.get();
		// 친구 신청 목록에서 제거
		friendRequestRepository.delete(friendRequest);
	}

	@Override
	public void addPlaylistIdAndHost(PlaylistRequestDto playlistRequestDto) {
		Optional<Friend> byId = friendRepository.findById(playlistRequestDto.getRelationId());

		if (byId.isEmpty()) {
			log.debug("해당하는 친구 관계가 없습니다.");
			return;
		}

		Friend friend = byId.get();
		friend.updatePlaylistIdAndHost(playlistRequestDto.getPlaylistId(), playlistRequestDto.getHost());
		friendRepository.save(friend);
	}

	@Override
	public List<MyFriendResponseDto> getMyFriends(String myId) {
		List<MyFriendResponseDto> result = new ArrayList<>();

		// 유저의 친구 목록
		List<Friend> byUser1Id = friendRepository.findByUser1Id(myId);
		List<Friend> byUser2Id = friendRepository.findByUser2Id(myId);

		List<String> myFriendsIdList = new ArrayList<>();
		for (Friend friend : byUser1Id) {
			myFriendsIdList.add(friend.getUser2Id());
		}

		for (Friend friend : byUser2Id) {
			myFriendsIdList.add(friend.getUser1Id());
		}

		// 범수가 idList Feign으로 가져가서 여기에 유저의 id, name, image 정보 리스트 가져다 줄꺼임
		// 사용자 정보 리스트
		List<UserInfoDto> userInfoList = userServiceClient.getMembersByUserIdIn(myFriendsIdList);

		// 리스트 크기가 같다고 가정
		int size = myFriendsIdList.size();

		// 데이터 결합
		for (int i = 0; i < size; i++) {
			Friend friend;
			if (i < byUser1Id.size()) {
				friend = byUser1Id.get(i);
			} else {
				friend = byUser2Id.get(i - byUser1Id.size());
			}
			UserInfoDto userInfo = userInfoList.get(i);

			MyFriendResponseDto responseDto = MyFriendResponseDto
				.builder()
				.relationId(friend.getId())
				.friendId(userInfo.getUserId())
				.name(userInfo.getName())
				.commonPlayListId(friend.getCommonPlaylistId())
				.img(userInfo.getImageUrl())
				.distance(friend.getDistance())
				.musicalTasteSimilarity(friend.getMusicalTasteSimilarity())
				.build();

			// 결과 리스트에 추가
			result.add(responseDto);
		}

		return result;
	}

	@Override
	public String getHostId(String playlistId) {
		Optional<Friend> byCommonPlaylistId = friendRepository.findByCommonPlaylistId(playlistId);
		if (byCommonPlaylistId.isEmpty()) {
			log.debug("해당 플레이리스트 아이디를 가진 친구 관계가 없습니다");
			return null;
		}

		// host Id 제공
		return byCommonPlaylistId.get().getHost();
	}
}
