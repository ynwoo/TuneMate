package com.tunemate.social.tunematesocial.client;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "user-service")
public interface UserServiceClient {
}
