package com.tunemate.tunemateplaylist.repository;

import com.tunemate.tunemateplaylist.domain.Track;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IndividualPlaylistTrackRepository extends JpaRepository<Track, Long> {

}
