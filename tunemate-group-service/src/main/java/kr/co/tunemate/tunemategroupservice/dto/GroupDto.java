package kr.co.tunemate.tunemategroupservice.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
@ToString
public class GroupDto {
    private String groupId;
    private String hostId;
    private String hostName;
    private String title;
    private Integer capacity;
    private Integer participantsCnt;
    private String concertId;
    private LocalDateTime startDateTime;
    private LocalDateTime deadline;
    private String content;
    @Builder.Default
    private Boolean closedByHost = false;
    private LocalDateTime createdAt;
    private LocalDateTime lastModifiedAt;
}
