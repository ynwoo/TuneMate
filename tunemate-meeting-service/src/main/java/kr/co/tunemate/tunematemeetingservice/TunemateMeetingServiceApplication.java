package kr.co.tunemate.tunematemeetingservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients

public class TunemateMeetingServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(TunemateMeetingServiceApplication.class, args);
    }

}
