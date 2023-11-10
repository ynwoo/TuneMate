package kr.co.tunemate.tunemategroupservice.exception;

import org.springframework.http.HttpStatus;

public class IllegalRequestException extends BaseException {
    public IllegalRequestException(String message, HttpStatus status) {
        super(message, status);
    }
}
