package kr.co.tunemate.tunemategroupservice.dto.layertolayer;

import kr.co.tunemate.tunemategroupservice.vo.UserInfo;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class GroupDto {
    private String groupId;
    private String hostId;
    private String hostName;
    private String title;
    private Integer capacity;
    private Long participantsCnt;
    private String concertId;
    private LocalDateTime startDateTime;
    private LocalDateTime deadline;
    private String content;
    private Boolean closedByHost = false;
    private List<UserInfo> userInfos;
    private LocalDateTime createdAt;
    private LocalDateTime lastModifiedAt;
}
