package com.tunemate.social.tunematesocial.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.tunemate.social.tunematesocial.dto.UserInfoDto;

@FeignClient(name = "user-service")
public interface UserServiceClient {
	@PostMapping("/users")  // 원격 서비스의 실제 엔드포인트 경로를 여기에 지정
	List<UserInfoDto> getMembersByUserIdIn(@RequestBody List<String> userIds);
}
