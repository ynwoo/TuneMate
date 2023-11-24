package kr.co.tunemate.tunemategroupservice.dto.layertolayer;

import kr.co.tunemate.tunemategroupservice.vo.UserInfo;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class GroupParticipationRequestDto {
    private String groupParticipationRequestId;
    private GroupDto groupDto;
    private UserInfo userInfo;
    private LocalDateTime createdAt;
    private LocalDateTime lastModifiedAt;
}
