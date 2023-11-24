package com.example.tunemateapigateway.filter;

import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.Base64;

@Component
@Slf4j
public class AuthorizationHeaderFilter extends AbstractGatewayFilterFactory<AuthorizationHeaderFilter.Config> {
    private final Environment env;

    public AuthorizationHeaderFilter(Environment env) {
        super(Config.class);
        this.env = env;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();

            String authorizationHeader = null;
            if (request.getQueryParams().containsKey(HttpHeaders.AUTHORIZATION)) { // 웹 소켓용 검증
                authorizationHeader = request.getQueryParams().getFirst(HttpHeaders.AUTHORIZATION);
                log.info("accessToken from QueryParam: {}", authorizationHeader);

            } else { // 그 외 검증
                if (!request.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                    return onError(exchange, "No Authorization header", HttpStatus.UNAUTHORIZED);
                }

                authorizationHeader = request.getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
            }

            String jwt = authorizationHeader.replace("Bearer ", "");

            if (!isValidJwt(jwt)) {
                return onError(exchange, "JWT token is not valid", HttpStatus.UNAUTHORIZED);
            }

            request.mutate()
                    .header("UserId", getSubject(jwt));

            return chain.filter(exchange);
        };
    }

    private boolean isValidJwt(String jwt) {
        String subject = null;

        try {
            subject = getSubject(jwt);
        } catch (Exception ex) {
            log.error(ex.getMessage());
            return false;
        }

        if (subject == null || subject.isEmpty()) {
            return false;
        }

        return true;
    }

    private Mono<Void> onError(ServerWebExchange exchange, String errorMsg, HttpStatus httpStatus) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(httpStatus);

        log.info(exchange.getRequest().getRemoteAddress().toString());
        log.info(exchange.getRequest().getPath().toString());
        log.info(exchange.getRequest().getQueryParams().toSingleValueMap().toString());
        log.info(errorMsg);

        return response.setComplete();
    }

    private String getSubject(String jwt) {
        byte[] encoded = Base64.getEncoder().encode(env.getProperty("jwt.private-key").getBytes());

        return Jwts.parser()
                .setSigningKey(encoded)
                .build()
                .parseSignedClaims(jwt)
                .getPayload()
                .getSubject();
    }

    public static class Config {

    }
}
