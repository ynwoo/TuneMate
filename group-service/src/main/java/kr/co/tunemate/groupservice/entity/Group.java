package kr.co.tunemate.groupservice.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Group {
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
    @Column(nullable = false)
    private LocalDateTime deadline;
    @Column(length = 1024)
    private String content;
}
