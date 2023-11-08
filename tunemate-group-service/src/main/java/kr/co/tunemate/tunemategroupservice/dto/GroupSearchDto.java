package kr.co.tunemate.tunemategroupservice.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GroupSearchDto {
    private String hostName;
    private Boolean joinable;
    private String title;
    private String content;
}
