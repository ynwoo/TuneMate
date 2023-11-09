package kr.co.tunemate.tunemategroupservice.exception;

import org.springframework.http.HttpStatus;

public class NoAuthorizationForItemException extends BaseException {
    public NoAuthorizationForItemException(String message, HttpStatus status) {
        super(message, status);
    }
}
