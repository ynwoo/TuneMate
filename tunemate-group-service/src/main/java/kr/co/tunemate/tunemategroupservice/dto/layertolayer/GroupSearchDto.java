package kr.co.tunemate.tunemategroupservice.dto.layertolayer;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class GroupSearchDto {
    private String hostName;
    private Boolean joinableOnly;
    private String title;
    private String content;
}
