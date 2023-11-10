package com.tunemate.social.tunematesocial.repository;

import java.util.List;
import java.util.Optional;

import com.tunemate.social.tunematesocial.dto.response.MyChatRoomListDto;
import org.springframework.data.jpa.repository.JpaRepository;

import com.tunemate.social.tunematesocial.entity.Friend;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FriendRepository extends JpaRepository<Friend, Long> {
	List<Friend> findByUser1Id(String myId);

	List<Friend> findByUser2Id(String myId);

	Optional<Friend> findByCommonPlaylistId(String playlistId);

	Optional<Friend> findByUser1IdAndAndUser2Id(String id1, String id2);

	@Query("select new com.tunemate.social.tunematesocial.dto.response.MyChatRoomListDto(f.id) from Friend f where f.user1Id = :userId or f.user2Id = :userId")
	List<MyChatRoomListDto> findChatRoomIdByUserId(@Param("userId") String userId);
}
