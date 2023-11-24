package com.tunemate.social.tunematesocial.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class RelationResponseDto {
	private final Long relationId;

	private final String host;

	private final String user1Id;

	private final String user2Id;

	private final String playlistId;

	private final String distance;

	private final String similarity;

	@Builder
	public RelationResponseDto(Long relationId, String host, String user1Id, String user2Id, String playlistId,
		String distance, String similarity) {
		this.relationId = relationId;
		this.host = host;
		this.user1Id = user1Id;
		this.user2Id = user2Id;
		this.playlistId = playlistId;
		this.distance = distance;
		this.similarity = similarity;
	}
}
