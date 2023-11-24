package kr.co.tunemate.tunemategroupservice.service;

import kr.co.tunemate.tunemategroupservice.dto.response.ConcertInfoResponseDto;

import java.util.List;

public interface ConcertService {

    List<ConcertInfoResponseDto> getConcertInfoList(String genre);

    ConcertInfoResponseDto getConcertById(Long concertId);
}
