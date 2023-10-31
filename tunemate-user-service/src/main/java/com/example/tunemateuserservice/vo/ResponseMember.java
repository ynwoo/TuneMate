package com.example.tunemateuserservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseMember {
    private String userId;
    private String spotifyUserId;
    private String name;
    private String email;
    private String imageUrl;
}
