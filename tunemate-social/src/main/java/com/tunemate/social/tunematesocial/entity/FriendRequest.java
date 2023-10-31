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

	@Builder
	public FriendRequest(String requestedUserId, String requestingUserId) {
		this.requestedUserId = requestedUserId;
		this.requestingUserId = requestingUserId;
	}
}
