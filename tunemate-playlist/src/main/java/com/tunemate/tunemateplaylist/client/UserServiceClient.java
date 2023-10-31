package com.tunemate.tunemateplaylist.client;

import com.tunemate.tunemateplaylist.vo.MemberInfo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "user-service")
public interface UserServiceClient {

    @GetMapping("/users/{userId}")
    MemberInfo getMember(@PathVariable String userId);
}
