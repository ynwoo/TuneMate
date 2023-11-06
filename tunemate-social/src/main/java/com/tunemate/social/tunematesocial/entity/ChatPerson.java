package com.tunemate.social.tunematesocial.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatPerson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private String userId;

    @ManyToOne
    private Friend friend;

    @Builder
    public ChatPerson(String userId, Friend friend){
        this.userId = userId;
        this.friend = friend;
    }



}
