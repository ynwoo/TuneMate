package kr.co.tunemate.tunemateuserservice.repository;

import kr.co.tunemate.tunemateuserservice.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findBySpotifyUserId(String spotifyUserId);
    Optional<Member> findByUserId(String userId);
    List<Member> findAllByUserIdInOrderByUserId(List<String> userIds);
}
