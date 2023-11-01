package com.tunemate.social.tunematesocial.service;

import java.util.List;

import com.tunemate.social.tunematesocial.dto.request.FriendRequestDto;
import com.tunemate.social.tunematesocial.dto.request.PlaylistRequestDto;
import com.tunemate.social.tunematesocial.dto.response.ReceivedFriendRequestResponseDto;

public interface SocialService {
	/**
	 * 친구 신청
	 * @param friendRequestDto
	 */
	void addFriendRequest(String myId, FriendRequestDto friendRequestDto);

	List<ReceivedFriendRequestResponseDto> getFriendRequests(String myId);

	void acceptFriendRequest(String myId, String newFriendId);

	void addPlaylistIdAndHost(PlaylistRequestDto playlistRequestDto);
}
