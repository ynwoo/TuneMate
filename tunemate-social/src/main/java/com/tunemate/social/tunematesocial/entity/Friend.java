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
public class Friend {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id; //  기본 키

	private String user1Id; // 친구1

	private String user2Id; // 친구2

	private String distance; // 거리

	private String musicalTasteSimilarity; // 음악 취향 유사도

	private String commonPlaylistId; // 공동 플레이리스트 아이디

	private String host; // 플레이리스트 host

	@Builder
	public Friend(Long id, String user1Id, String user2Id, String distance, String musicalTasteSimilarity,
		String commonPlaylistId, String host) {
		this.id = id;
		this.user1Id = user1Id;
		this.user2Id = user2Id;
		this.distance = distance;
		this.musicalTasteSimilarity = musicalTasteSimilarity;
		this.commonPlaylistId = commonPlaylistId;
		this.host = host;
	}
}
