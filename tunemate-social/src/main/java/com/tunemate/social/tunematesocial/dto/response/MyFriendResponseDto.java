package com.tunemate.social.tunematesocial.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MyFriendResponseDto {
	private Long relationId;
	private String friendId;
	private String name;
	private String commonPlayListId;
	private String img;
	private String distance;
	private String musicalTasteSimilarity;

	@Builder
	public MyFriendResponseDto(Long relationId, String friendId, String name, String commonPlayListId, String img,
		String distance, String musicalTasteSimilarity) {
		this.relationId = relationId;
		this.friendId = friendId;
		this.name = name;
		this.commonPlayListId = commonPlayListId;
		this.img = img;
		this.distance = distance;
		this.musicalTasteSimilarity = musicalTasteSimilarity;
	}
}