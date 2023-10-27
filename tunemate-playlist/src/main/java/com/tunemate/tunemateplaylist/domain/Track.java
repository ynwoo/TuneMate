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


    private String title;


    private String genre;

    @Column()
    private Integer count;

    @Column(name = "snapshot_id")
    private String snapshotId;

    @ManyToOne
    private Playlist playlist;

    @Column(name = "track_spotify_id")
    private String trackSpotifyId;

    @PrePersist
    public void setCreatedAt() {
        this.count = 0;
        this.genre = "없음";
    }
}
