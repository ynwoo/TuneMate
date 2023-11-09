package kr.co.tunemate.tunematemeetingservice.client;

import kr.co.tunemate.tunematemeetingservice.dto.ConcertDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name ="group-service")
public interface GroupServiceClient {
    @GetMapping("/concert/{concertId}")
    ConcertDto getConcertInfo(@PathVariable Long concertId);
}
