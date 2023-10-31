package com.tunemate.tunemateplaylist.client;

import feign.FeignException;
import feign.Response;
import feign.codec.DecodeException;
import feign.codec.ErrorDecoder;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.lang.reflect.Type;

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
            case 404:
                break;
            default:
                return new Exception(response.reason());

        }

        return null;
    }
}
