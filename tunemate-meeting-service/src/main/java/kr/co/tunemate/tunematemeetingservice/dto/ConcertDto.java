package kr.co.tunemate.tunematemeetingservice.dto;

import lombok.Getter;

import java.util.Date;

@Getter
public class ConcertDto {

    private Long id;

    private String imageUrl;

    private String title;

    private String place;

    private Date startDate;

    private Date endDate;

    private String link;

}
