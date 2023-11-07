package kr.co.tunemate.tunemategroupservice.dto;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

public abstract class BaseTimeEntityDto {
    private LocalDateTime createdAt;
    private LocalDateTime lastModifiedAt;
}
