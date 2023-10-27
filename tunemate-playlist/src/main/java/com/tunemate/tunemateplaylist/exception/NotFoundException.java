package com.tunemate.tunemateplaylist.exception;

import io.netty.handler.codec.http.HttpResponseStatus;

public class NotFoundException extends BaseException{
    public NotFoundException(String message, HttpResponseStatus httpResponseStatus) {
        super(message, httpResponseStatus);
    }
}
