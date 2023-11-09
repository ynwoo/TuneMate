package kr.co.tunemate.tunemategroupservice.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Schema(description = "공고 요청 VO")
public class RequestGroup {
    private String groupId;
    @NotNull
    private String title;
    @NotNull
    private String content;
    @NotNull
    private Integer capacity;
    @NotNull
    private LocalDateTime deadline;
    @NotNull
    private String concertId;
}
