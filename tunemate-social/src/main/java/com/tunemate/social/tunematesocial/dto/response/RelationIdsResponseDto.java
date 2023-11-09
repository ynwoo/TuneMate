package com.tunemate.social.tunematesocial.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class RelationIdsResponseDto {
	private final String user1Id;
	private final String user2Id;

	@Builder
	public RelationIdsResponseDto(String user1Id, String user2Id) {
		this.user1Id = user1Id;
		this.user2Id = user2Id;
	}
}
