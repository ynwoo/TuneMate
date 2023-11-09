package kr.co.tunemate.tunematemeetingservice.client;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;


@FeignClient(name ="social-service")
public interface SocialServiceClient {


    @GetMapping("/relation/{relationId}") // relationId 가 존재하는지 확인 하는 요청
    Boolean isExistRelation(@PathVariable Long relationId);

}

