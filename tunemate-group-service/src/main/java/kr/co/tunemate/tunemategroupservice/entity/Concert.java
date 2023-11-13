package kr.co.tunemate.tunemategroupservice.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.Date;

@Entity
@Getter
@Table(name = "concert", uniqueConstraints = {@UniqueConstraint(columnNames = "title")})
public class Concert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "image", length = 255)
    private String image;

    @Column(name = "title", length = 255, unique = true)
    private String title;

    @Column(name = "place", length = 255)
    private String place;

    @Column(name = "stdate")
    private Date stdate;

    @Column(name = "eddate")
    private Date eddate;

    @Column(name = "genre", length = 100)
    private String genre;

    @Column(name = "link", length = 255)
    private String link;
}
