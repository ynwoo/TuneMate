package kr.co.tunemate.groupservice.vo;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RequestGroup {
    private String groupId;
    private String title;
    private Integer capacity;
    private String concertId;
    private LocalDateTime deadline;
    private String content;
}
