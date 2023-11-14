package kr.co.tunemate.tunemategroupservice.client;

import kr.co.tunemate.tunemategroupservice.vo.UserInfo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@FeignClient(name = "user-service")
public interface UserServiceClient {
    @PostMapping("/users")
    public List<UserInfo> getUserInfo(List<String> userIds);
}
