package com.tunemate.tunemateplaylist.exception;

import io.netty.handler.codec.http.HttpResponseStatus;
import org.springframework.http.HttpStatus;

public class NotFoundException extends BaseException{

    private HttpStatus httpResponseStatus;

    public NotFoundException(String message, HttpStatus httpResponseStatus) {
        super(message, httpResponseStatus);
        this.httpResponseStatus = httpResponseStatus;
    }

    public HttpStatus getHttpResponseStatus() {
        return httpResponseStatus;
    }

}
