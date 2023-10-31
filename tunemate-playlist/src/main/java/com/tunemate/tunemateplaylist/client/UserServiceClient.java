package com.tunemate.tunemateplaylist.client;

import com.tunemate.tunemateplaylist.vo.MemberInfo;
import feign.HeaderMap;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@FeignClient(name = "user-service")
public interface UserServiceClient {

    @GetMapping("/users/{userId}")
    MemberInfo getMember(@HeaderMap Map<String, Object> headers, @PathVariable String userId);
}
