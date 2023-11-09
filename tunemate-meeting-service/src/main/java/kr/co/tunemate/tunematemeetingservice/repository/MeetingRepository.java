package kr.co.tunemate.tunematemeetingservice.repository;

import kr.co.tunemate.tunematemeetingservice.domain.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingRepository extends JpaRepository<Meeting,Long> {
}
