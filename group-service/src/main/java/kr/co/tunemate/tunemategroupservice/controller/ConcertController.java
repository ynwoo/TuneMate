package kr.co.tunemate.tunemategroupservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import kr.co.tunemate.tunemategroupservice.service.ConcertService;
import lombok.RequiredArgsConstructor;

@RestController()
@RequestMapping("concert")
@RequiredArgsConstructor
public class ConcertController {
	private final ConcertService concertService;

	@Operation(summary = "공연 정보 목록 조회", description = """
		공연 정보 목록을 조회합니다.
				
		장르(없으면 전체 검색)
				
		- Bal : 발라드
				
		- Roc : 락/메탈
				
		- Rap : 랩/힙합
				
		- Jaz : 재즈/소울
				
		- Por : 포크/트로트
				
		- For : 내한공연
				
		- Fes : 페스티벌
				
		- Ind : 인디
				
		""")
	@GetMapping("/concerts")
	public ResponseEntity<?> getConcertInfosByGenre(@RequestHeader("UserId") String userId,
		@RequestParam(value = "genre", required = false) String genre) {
		return ResponseEntity.ok(concertService.getConcertInfoList(genre));
	}

	@Operation(summary = "단일 공연 정보 조회", description = """
		단일 공연 정보를 조회합니다.
		""")
	@GetMapping("/{concertId}")
	public ResponseEntity<?> getConcertInfoById(@RequestHeader("UserId") String userId,
		@PathVariable("concertId") Long concertId) {
		return ResponseEntity.ok(concertService.getConcertById(concertId));
	}
}
