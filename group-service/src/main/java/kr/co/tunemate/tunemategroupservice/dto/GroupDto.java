package kr.co.tunemate.tunemategroupservice.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
public class GroupDto {
    private String groupId;
    private String title;
    private Integer capacity;
    private String concertId;
    private LocalDateTime deadline;
    private String content;
}
