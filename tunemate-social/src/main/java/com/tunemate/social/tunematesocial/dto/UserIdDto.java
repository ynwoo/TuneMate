package com.tunemate.social.tunematesocial.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
public class UserIdDto {

    @Schema(description = "사용자의 UUID", example = "43d70548-f69f-44cb-85f7-ad9b1e05f909")
    private String userId;
}
