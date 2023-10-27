package com.tunemate.tunemateplaylist.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Track {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Column
    private String genre;

    @ManyToOne
    @JoinColumn(name = "playlist_id")
    private Playlist playlistId;
}
