package com.tunemate.social.tunematesocial.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MyChatRoomListDto {

	@Schema(description = "채팅방(친구관계) 기본키", example = "3")
	private Long chatRoomId;
}
