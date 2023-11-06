package com.tunemate.social.tunematesocial.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private String userId;

    @ManyToOne
    private Friend relationId;

    @Builder
    public Chat( String userId, Friend friend){
        this.userId = userId;
        this.relationId = friend;
    }



}
