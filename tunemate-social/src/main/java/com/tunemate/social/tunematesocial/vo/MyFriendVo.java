package com.tunemate.social.tunematesocial.vo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MyFriendVo {
	private Long relationId;
	private String friendId;
	private String name;
	private String commonPlayListId;
	private String img;
	private String distance;
	private String musicalTasteSimilarity;
}
