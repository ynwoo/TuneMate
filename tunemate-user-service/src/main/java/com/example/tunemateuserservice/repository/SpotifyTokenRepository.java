package com.example.tunemateuserservice.repository;

import com.example.tunemateuserservice.model.SpotifyToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpotifyTokenRepository extends CrudRepository<SpotifyToken, String> {
}
