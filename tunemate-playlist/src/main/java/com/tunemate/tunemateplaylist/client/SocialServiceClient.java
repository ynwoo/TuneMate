package com.tunemate.tunemateplaylist.client;

import com.tunemate.tunemateplaylist.vo.MemberInfo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@FeignClient(name ="social-service")
public interface SocialServiceClient {
    @PostMapping("/common-playlist")
    MemberInfo getMember(@RequestBody Map<String, String> headers);
}
