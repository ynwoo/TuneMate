package kr.co.tunemate.tunemateuserservice;

import feign.codec.Encoder;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;

@SpringBootApplication
@EnableRedisRepositories
@EnableFeignClients
public class TunemateUserServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(TunemateUserServiceApplication.class, args);

    }
    
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        return mapper;
    }

    @Bean
    Encoder formEncoder() {
        return new feign.form.FormEncoder();
    }
}
