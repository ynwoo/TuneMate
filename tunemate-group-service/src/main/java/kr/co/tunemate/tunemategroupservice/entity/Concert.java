package kr.co.tunemate.tunemategroupservice.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;

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
