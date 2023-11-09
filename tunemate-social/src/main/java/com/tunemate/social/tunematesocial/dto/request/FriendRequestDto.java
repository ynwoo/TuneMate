package com.tunemate.social.tunematesocial.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Schema(description = "친구신청 요청DTO")
@Getter
public class FriendRequestDto {
	@Schema(description = "친구신청할 유저 아이디")
	private String userId;
	@Schema(description = "친구신청할 유저와의 거리")
	private String distance;
	@Schema(description = "친구신청할 유저와의 음악취향유사도")
	private String musicalTasteSimilarity;
}
