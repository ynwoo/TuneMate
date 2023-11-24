package com.tunemate.social.tunematesocial.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FriendRequest {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id; //  기본 키

	private String requestedUserId; // 요청받은 유저 아이디

	private String requestingUserId; // 요청한 유저 아이디

	private String distance; // 요청한 유저와의 거리

	private String musicalTasteSimilarity; // 요청한 유저와의 음악 취향 유사도

	@Builder
	public FriendRequest(String requestedUserId, String requestingUserId,
		String distance, String musicalTasteSimilarity) {
		this.requestedUserId = requestedUserId;
		this.requestingUserId = requestingUserId;
		this.distance = distance;
		this.musicalTasteSimilarity = musicalTasteSimilarity;
	}
}
