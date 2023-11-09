package kr.co.tunemate.tunematemeetingservice.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String memo;

    @Column(name = "concert_id")
    private Long concertId;

    private LocalDateTime datetime;

    @Column(name = "relation_id")
    private Long relationId;

    @Builder
    public Meeting(String memo, LocalDateTime datetime, Long relationId, Long concertId){
        this.memo = memo;
        this.datetime = datetime;
        this.relationId = relationId;
        this.concertId = concertId;
    }



}
