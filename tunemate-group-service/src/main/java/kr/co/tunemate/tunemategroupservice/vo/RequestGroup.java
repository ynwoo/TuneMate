package kr.co.tunemate.tunemategroupservice.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Schema(description = "공고 요청 VO")
public class RequestGroup {
    private String title;
    private String content;
    private Integer capacity;
    private LocalDateTime deadline;
    private String concertId;
}
