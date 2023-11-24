package kr.co.tunemate.tunemategroupservice.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
public class ConcertInfoResponseDto {
    private Long id;
    private String imageUrl;
    private String title;
    private String place;
    private Date startDate;
    private Date endDate;
    private String link;

    @Builder
    public ConcertInfoResponseDto(Long id, String imageUrl, String title, String place, Date startDate, Date endDate,
                                  String link) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.title = title;
        this.place = place;
        this.startDate = startDate;
        this.endDate = endDate;
        this.link = link;
    }
}