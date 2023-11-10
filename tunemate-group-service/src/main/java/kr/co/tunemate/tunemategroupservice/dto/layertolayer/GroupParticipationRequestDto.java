package kr.co.tunemate.tunemategroupservice.dto.layertolayer;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GroupParticipationRequestDto {
    private String groupParticipationRequestId;
    private GroupDto groupDto;
    private String userId;
}
