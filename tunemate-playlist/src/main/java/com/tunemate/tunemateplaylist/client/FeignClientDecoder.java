package com.tunemate.tunemateplaylist.client;

import feign.FeignException;
import feign.Response;
import feign.codec.DecodeException;
import feign.codec.ErrorDecoder;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.lang.reflect.Type;

@Component
public class FeignClientDecoder implements ErrorDecoder {

    @Override
    public Exception decode(String methodKey, Response response) {
        switch (response.status()) {
            case 400:
                break;
            case 403:
                if (methodKey.contains("getMember")) {
                    return new ResponseStatusException(HttpStatus.valueOf(response.status()),
                            "Member 정보에 접근할 권한이 없습니다.");
                }
                break;
            case 404:
                System.out.println("에러에러");
                return new ResponseStatusException(HttpStatus.valueOf(response.status()),
                        "relationId가 존재하지 않습니다.");
            default:
                return new Exception(response.reason());

        }

        return null;
    }
}
