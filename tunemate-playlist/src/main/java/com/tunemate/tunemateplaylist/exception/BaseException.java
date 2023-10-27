package com.tunemate.tunemateplaylist.exception;

import io.netty.handler.codec.http.HttpResponseStatus;

public abstract class BaseException extends RuntimeException {

    private HttpResponseStatus responseStatus;

    public BaseException() {
        super();
    }

    public BaseException(String message, HttpResponseStatus httpResponseStatus) {
        super(message);
        this.responseStatus = httpResponseStatus;
    }

    public BaseException(String message, Throwable cause) {
        super(message, cause);
    }

    public BaseException(Throwable cause) {
        super(cause);
    }
}
