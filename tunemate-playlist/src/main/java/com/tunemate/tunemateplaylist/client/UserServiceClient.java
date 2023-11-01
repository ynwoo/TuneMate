package com.tunemate.tunemateplaylist.client;

import com.tunemate.tunemateplaylist.vo.MemberInfo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.Map;

@FeignClient(name = "user-service")
public interface UserServiceClient {

    @GetMapping("/users/{userId}")
    MemberInfo getMember(@RequestHeader Map<String, String> headers, @PathVariable String userId);
}
