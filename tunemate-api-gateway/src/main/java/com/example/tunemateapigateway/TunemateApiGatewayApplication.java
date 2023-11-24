package com.example.tunemateapigateway;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "API Gateway", version = "1.0", description = "Documentaion API Gateway v1.0"))
public class TunemateApiGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(TunemateApiGatewayApplication.class, args);
	}

}
