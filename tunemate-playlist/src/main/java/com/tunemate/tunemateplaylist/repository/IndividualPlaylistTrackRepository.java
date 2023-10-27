package com.tunemate.tunemateplaylist.repository;

import com.tunemate.tunemateplaylist.domain.Playlist;
import com.tunemate.tunemateplaylist.domain.Track;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IndividualPlaylistTrackRepository extends JpaRepository<Track, Long> {
    Optional<Track> findByTrackSpotifyIdAndPlaylist(String uri, Playlist playlist);

    void deleteByTrackSpotifyId(String uri);

}
