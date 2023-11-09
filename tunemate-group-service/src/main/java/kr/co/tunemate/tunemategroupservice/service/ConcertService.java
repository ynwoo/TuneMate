package kr.co.tunemate.tunemategroupservice.service;

import java.util.List;

import kr.co.tunemate.tunemategroupservice.dto.response.ConcertInfoResponseDto;

public interface ConcertService {

	List<ConcertInfoResponseDto> getConcertInfoList(String genre);

	ConcertInfoResponseDto getConcertById(Long concertId);
}
