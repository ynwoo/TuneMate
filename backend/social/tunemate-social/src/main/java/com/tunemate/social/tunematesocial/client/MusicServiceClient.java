package com.tunemate.social.tunematesocial.client;

import com.tunemate.social.tunematesocial.dto.FriendInfoDto;
import com.tunemate.social.tunematesocial.dto.UserInfoDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "music-service")
public interface MusicServiceClient {
    @GetMapping("/individual/info/{userId}")  // 원격 서비스의 실제 엔드포인트 경로를 여기에 지정
    FriendInfoDto getFriendInfo(@RequestHeader("UserId") String userId, @PathVariable("userId") String FriendId);
}
