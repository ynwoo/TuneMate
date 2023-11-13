package kr.co.tunemate.tunematemeetingservice.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import java.util.Date;

@Getter
public class ConcertDto {

    @Schema(description = "공연 정보의 기본키", example = "1")
    private Long id;
    @Schema(description = "공연 이미지 url", example = "http://ticketimage.interpark.com/rz/image/play/goods/poster/23/23016176_p_s.jpg")
    private String imageUrl;
    @Schema(description = "공연 제목", example = "2023 성시경 연말 콘서트 〈성시경〉")
    private String title;
    @Schema(description = "공연 장소", example = "KSPO DOME")
    private String place;
    @Schema(description = "공연 시작 날짜", example = "2023-12-29 00:00:00")
    private Date startDate;
    @Schema(description = "공연 마지막 날짜", example = "2023-12-31 00:00:00")
    private Date endDate;
    @Schema(description = "공연 예매 링크", example = "https://ticket.interpark.com/Ticket/Goods/GoodsInfo.asp?GroupCode=23016176")
    private String link;

}
