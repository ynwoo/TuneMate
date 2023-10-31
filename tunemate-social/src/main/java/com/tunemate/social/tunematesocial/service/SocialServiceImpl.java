package com.tunemate.social.tunematesocial.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tunemate.social.tunematesocial.dto.request.FriendRequestDto;
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
		// 신청보낸 유저가 존재하는지 확인 필요
		String userId = friendRequestDto.getUserId();

		// Dto -> Entity 변환
		FriendRequest friendRequest = FriendRequest.builder()
			.requestingUserId(myId)
			.requestedUserId(userId)
			.build();

		// repository 저장
		friendRequestRepository.save(friendRequest);

	}
}
