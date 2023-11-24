package com.tunemate.tunemateplaylist.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Tracks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(name = "spotify_uri")
    private String spotifyUri;

    private String artist;

    private double acousticness;

    private double danceability;

    private double energy;

    private double tempo;

    private String image;
}
