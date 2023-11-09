package com.tunemate.social.tunematesocial.service;

import java.util.List;

import com.tunemate.social.tunematesocial.dto.UserIdDto;
import com.tunemate.social.tunematesocial.dto.request.FriendRequestDto;
import com.tunemate.social.tunematesocial.dto.request.PlaylistRequestDto;
import com.tunemate.social.tunematesocial.dto.response.MyFriendResponseDto;
import com.tunemate.social.tunematesocial.dto.response.ReceivedFriendRequestResponseDto;
import com.tunemate.social.tunematesocial.dto.response.RelationIdsResponseDto;
import com.tunemate.social.tunematesocial.entity.ChattingRoom;

public interface SocialService {
	/**
	 * 친구 신청
	 * @param friendRequestDto
	 */
	void addFriendRequest(String myId, FriendRequestDto friendRequestDto);

	List<ReceivedFriendRequestResponseDto> getFriendRequests(String myId);

	void acceptFriendRequest(String myId, String newFriendId);

	void declineFriendRequest(String myId, String notFriendId);

	void addPlaylistIdAndHost(PlaylistRequestDto playlistRequestDto);

	List<MyFriendResponseDto> getMyFriends(String myId);

	String getHostId(String playlistId);

	ChattingRoom getChats(long relationId);

	void setChats(long relationId, String userId);

	void setChatPerson(long relationId, String userId);

	void outChat(long relationId, String userId);

	List<UserIdDto> getRequestUserId(String userId);

	RelationIdsResponseDto getRelationId(Long relationId);
}
