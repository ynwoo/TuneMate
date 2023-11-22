package com.tunemate.social.tunematesocial.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ReceivedFriendRequestResponseDto {
	private String userId;
	private String name;
	private String img;
	private String distance;
	private String musicalTasteSimilarity;

	@Builder
	public ReceivedFriendRequestResponseDto(String userId, String name, String img, String distance,
		String musicalTasteSimilarity) {
		this.userId = userId;
		this.name = name;
		this.img = img;
		this.distance = distance;
		this.musicalTasteSimilarity = musicalTasteSimilarity;
	}
}