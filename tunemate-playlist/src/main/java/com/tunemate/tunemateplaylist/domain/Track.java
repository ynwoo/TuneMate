package com.tunemate.tunemateplaylist.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Track {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column()
    private Integer count;


    @ManyToOne
    private Playlist playlist;

    @Column(name = "track_spotify_id")
    private String trackSpotifyId;

    @PrePersist
    public void setCreatedAt() {
        this.count = 0;
    }
}
