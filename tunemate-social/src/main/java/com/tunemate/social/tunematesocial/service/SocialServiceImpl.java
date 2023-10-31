package com.tunemate.social.tunematesocial.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tunemate.social.tunematesocial.dto.UserInfoDto;
import com.tunemate.social.tunematesocial.dto.request.FriendRequestDto;
import com.tunemate.social.tunematesocial.dto.response.ReceivedFriendRequestResponseDto;
import com.tunemate.social.tunematesocial.entity.FriendRequest;
import com.tunemate.social.tunematesocial.repository.FriendRepository;
import com.tunemate.social.tunematesocial.repository.FriendRequestRepository;

@Service
public class SocialServiceImpl implements SocialService {
	private final FriendRepository friendRepository;

	private final FriendRequestRepository friendRequestRepository;

	@Autowired
	public SocialServiceImpl(FriendRepository friendRepository, FriendRequestRepository friendRequestRepository) {
		this.friendRepository = friendRepository;
		this.friendRequestRepository = friendRequestRepository;
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

		// 범수가 idList Feign으로 가져가서 여기에 유저의 id, name, image 정보 리스트 가져다 줄꺼임
		// 사용자 정보 리스트
		// List<UserInfoDto> userInfoList = feignClient.getUsersByIdList(idList);

		// 리스트 크기가 같다고 가정
		int size = byRequestedUserId.size();

		// 데이터 결합
		// for (int i = 0; i < size; i++) {
		// 	FriendRequest friendRequest = byRequestedUserId.get(i);
		// 	UserInfoDto userInfo = userInfoList.get(i);
		//
		// 	ReceivedFriendRequestResponseDto responseDto = ReceivedFriendRequestResponseDto
		// 		.builder()
		// 		.userId(userInfo.getUserId())
		// 		.name(userInfo.getName())
		// 		.img(userInfo.getImg())
		// 		.distance(friendRequest.getDistance())
		// 		.musicalTasteSimilarity(friendRequest.getMusicalTasteSimilarity())
		// 		.build();
		//
		// 	// 결과 리스트에 추가
		// 	result.add(responseDto);
		// }

		return result;
	}
}
