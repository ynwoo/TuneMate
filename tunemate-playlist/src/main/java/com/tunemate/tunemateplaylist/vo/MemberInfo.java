package com.tunemate.tunemateplaylist.vo;

import lombok.Data;

@Data
public class MemberInfo {
    private String userId;
    private String spotifyUserId;
    private String name;
    private String email;
    private String imageUrl;
    private String spotifyAccessToken;
}
