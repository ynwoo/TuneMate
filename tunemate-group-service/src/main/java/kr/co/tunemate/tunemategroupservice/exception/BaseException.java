package kr.co.tunemate.tunemategroupservice.exception;

import org.springframework.http.HttpStatus;

public abstract class BaseException extends RuntimeException {
    private HttpStatus status;

    public BaseException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }
}
