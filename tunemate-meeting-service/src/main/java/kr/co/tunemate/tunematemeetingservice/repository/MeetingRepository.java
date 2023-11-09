package kr.co.tunemate.tunematemeetingservice.repository;

import kr.co.tunemate.tunematemeetingservice.domain.Meeting;
import kr.co.tunemate.tunematemeetingservice.dto.MeetingResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MeetingRepository extends JpaRepository<Meeting,Long> {

    List<Meeting> findByRelationId(long relationId);

    Optional<Meeting> findById(long meetingId);
}
