package kr.co.tunemate.tunemategroupservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.co.tunemate.tunemategroupservice.entity.Concert;

public interface ConcertRepository extends JpaRepository<Concert, Long> {

	List<Concert> findByGenre(String genre);
}
