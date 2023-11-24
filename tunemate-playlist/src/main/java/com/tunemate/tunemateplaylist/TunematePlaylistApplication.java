package com.tunemate.tunemateplaylist;

import feign.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class TunematePlaylistApplication {

    public static void main(String[] args) {
        SpringApplication.run(TunematePlaylistApplication.class, args);
    }

}
