package kr.co.tunemate.tunemategroupservice.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Schema(description = "공고 생성 요청 VO")
public class RequestGroup {
    private String groupId;
    private String title;
    private Integer capacity;
    private String concertId;
    private LocalDateTime deadline;
    private String content;
}
