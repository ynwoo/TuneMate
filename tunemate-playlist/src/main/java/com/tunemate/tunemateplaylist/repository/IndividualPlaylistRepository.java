package com.tunemate.tunemateplaylist.repository;

import com.tunemate.tunemateplaylist.domain.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IndividualPlaylistRepository extends JpaRepository<Playlist,Long> {

    Optional<Playlist> findByUserId(long userId);
}
