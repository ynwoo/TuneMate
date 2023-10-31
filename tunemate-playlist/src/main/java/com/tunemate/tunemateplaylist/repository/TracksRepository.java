package com.tunemate.tunemateplaylist.repository;

import com.tunemate.tunemateplaylist.domain.Tracks;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TracksRepository extends JpaRepository<Tracks, Long> {
    List<Tracks> findBySpotifyUri(String spotifyUri);
}
