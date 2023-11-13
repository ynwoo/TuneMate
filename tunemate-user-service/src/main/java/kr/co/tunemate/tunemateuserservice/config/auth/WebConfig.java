package kr.co.tunemate.tunemateuserservice.config.auth;

import kr.co.tunemate.tunemateuserservice.service.MemberService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Configuration
@EnableWebSecurity
public class WebConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, MemberService memberService, AuthenticationSuccessHandler authenticationSuccessHandler) throws Exception {
        http.oauth2Login(oauth2login -> oauth2login.userInfoEndpoint(userInfoEndpointConfig -> userInfoEndpointConfig.userService(memberService))
                .successHandler(authenticationSuccessHandler));
        http.csrf(httpSecurityCsrfConfigurer -> httpSecurityCsrfConfigurer.disable());
        http.cors(Customizer.withDefaults());

        return http.build();
    }
}
