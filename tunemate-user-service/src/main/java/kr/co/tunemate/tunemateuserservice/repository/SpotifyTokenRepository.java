package kr.co.tunemate.tunemateuserservice.repository;

import kr.co.tunemate.tunemateuserservice.model.SpotifyToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpotifyTokenRepository extends CrudRepository<SpotifyToken, String> {
}
