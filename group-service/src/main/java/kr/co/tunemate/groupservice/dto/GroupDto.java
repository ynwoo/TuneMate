package kr.co.tunemate.groupservice.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroupDto {
    private String groupId;
    private String title;
    private Integer capacity;
    private String concertId;
    private LocalDateTime deadline;
    private String content;
}
