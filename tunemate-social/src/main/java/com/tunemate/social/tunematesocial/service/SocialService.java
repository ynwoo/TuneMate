package com.tunemate.social.tunematesocial.service;

import com.tunemate.social.tunematesocial.dto.request.FriendRequestDto;

public interface SocialService {
	/**
	 * 친구 신청
	 * @param friendRequestDto
	 */
	void addFriendRequest(String myId, FriendRequestDto friendRequestDto);
}
