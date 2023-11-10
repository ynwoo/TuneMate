package com.tunemate.tunemateplaylist.client;

import com.tunemate.tunemateplaylist.dto.RelationInfoDto;
import com.tunemate.tunemateplaylist.vo.MemberInfo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@FeignClient(name ="social-service")
public interface SocialServiceClient {
    @PostMapping("/common-playlist")
    MemberInfo setPlaylist(@RequestBody Map<String, Object> headers);

    @GetMapping("/host/{playlistId}") // 플레이리스트 ID를 제공해서 해당 플레이리스트의 호스트 ID 값을 받는 요청
    String getHost(@PathVariable String playlistId);

    @GetMapping("/relation/{relationId}") // relationId를 이용해서 친구관계 정보를 요청
    RelationInfoDto getRelationInfo(@PathVariable long relationId);

}
