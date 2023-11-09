package kr.co.tunemate.tunemategroupservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import kr.co.tunemate.tunemategroupservice.dto.response.ConcertInfoResponseDto;
import kr.co.tunemate.tunemategroupservice.entity.Concert;
import kr.co.tunemate.tunemategroupservice.repository.ConcertRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ConcertServiceImpl implements ConcertService {

	private final ConcertRepository concertRepository;

	@Override
	public List<ConcertInfoResponseDto> getConcertInfoList(String genre) {
		List<Concert> concertList;

		// 전체 조회 또는 장르에 따른 조회
		if (genre == null) {
			concertList = concertRepository.findAll();
		} else {
			concertList = concertRepository.findByGenre(genre);
		}

		// Concert 엔티티를 ConcertInfoResponseDto로 변환
		List<ConcertInfoResponseDto> concertInfoList = new ArrayList<>();
		for (Concert concert : concertList) {
			concertInfoList.add(EntityToDto(concert));
		}

		return concertInfoList;
	}

	@Override
	public ConcertInfoResponseDto getConcertById(Long concertId) {
		Optional<Concert> concertOptional = concertRepository.findById(concertId);
		if (concertOptional.isEmpty()) {
			return null;
		}
		Concert concert = concertOptional.get();
		return EntityToDto(concert);
	}

	public ConcertInfoResponseDto EntityToDto(Concert concert) {
		return ConcertInfoResponseDto.builder()
			.id(concert.getId())
			.imageUrl(concert.getImage())
			.title(concert.getTitle())
			.place(concert.getPlace())
			.startDate(concert.getStdate())
			.endDate(concert.getEddate())
			.link(concert.getLink())
			.build();
	}
}
