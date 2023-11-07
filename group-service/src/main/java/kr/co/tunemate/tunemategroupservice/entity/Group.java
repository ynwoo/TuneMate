package kr.co.tunemate.tunemategroupservice.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity(name = "group_table")
public class Group extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String groupId;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private Integer capacity;
    @Column(nullable = false)
    private String concertId;
    @CreatedDate
    private LocalDateTime startDateTime;
    @Column(nullable = false)
    private LocalDateTime deadline;
    @Column(length = 1024)
    private String content;
}
