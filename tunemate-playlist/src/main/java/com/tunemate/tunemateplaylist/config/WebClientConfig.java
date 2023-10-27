package com.tunemate.tunemateplaylist.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;


@Configuration
public class WebClientConfig {

    private final String spotifyBaseUrl;

    public WebClientConfig(@Value("${spotify.base-url}") String spotifyBaseUrl){
        this.spotifyBaseUrl = spotifyBaseUrl;
    }
    @Bean
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder().baseUrl(spotifyBaseUrl);
    }
}
