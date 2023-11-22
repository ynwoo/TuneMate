package com.tunemate.social.tunematesocial.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class RelationIdResponseDto {
	private final Long relationId;

	@Builder
	public RelationIdResponseDto(Long relationId) {
		this.relationId = relationId;
	}
}
