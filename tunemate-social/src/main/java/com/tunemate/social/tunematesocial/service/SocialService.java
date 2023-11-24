package com.tunemate.social.tunematesocial.service;

import java.util.List;

import com.tunemate.social.tunematesocial.dto.ChattingListDto;
import com.tunemate.social.tunematesocial.dto.UserIdDto;
import com.tunemate.social.tunematesocial.dto.request.FriendRequestDto;
import com.tunemate.social.tunematesocial.dto.request.PlaylistRequestDto;
import com.tunemate.social.tunematesocial.dto.response.MyFriendResponseDto;
import com.tunemate.social.tunematesocial.dto.response.ReceivedFriendRequestResponseDto;
import com.tunemate.social.tunematesocial.dto.response.RelationResponseDto;

public interface SocialService {
	void addFriendRequest(String myId, FriendRequestDto friendRequestDto);

	List<ReceivedFriendRequestResponseDto> getFriendRequests(String myId);

	Long acceptFriendRequest(String myId, String newFriendId);

	void declineFriendRequest(String myId, String notFriendId);

	void addPlaylistIdAndHost(PlaylistRequestDto playlistRequestDto);

	List<MyFriendResponseDto> getMyFriends(String myId);

	String getHostId(String playlistId);

	ChattingListDto getChats(long relationId);

	void setChats(long relationId, String userId);

	void setChatPerson(long relationId, String userId);

	void outChat(long relationId, String userId);

	List<UserIdDto> getRequestUserId(String userId);

	RelationResponseDto getRelationInfo(Long relationId);

	void checkUser(Long relationId, String userId);
}
