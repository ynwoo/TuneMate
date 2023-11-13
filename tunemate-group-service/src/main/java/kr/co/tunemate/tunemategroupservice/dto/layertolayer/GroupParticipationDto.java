package kr.co.tunemate.tunemategroupservice.dto.layertolayer;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class GroupParticipationDto {
    private String groupParticipationId;
    private GroupDto groupDto;
    private String userId;
    private LocalDateTime createdAt;
    private LocalDateTime lastModifiedAt;
}
