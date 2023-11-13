package kr.co.tunemate.tunemateuserservice.vo;

import lombok.Data;

@Data
public class ResponseMemberInfo {
    private String userId;
    private String name;
    private String imageUrl;
}
