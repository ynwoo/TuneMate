package kr.co.tunemate.tunemateuserservice.exception;

import org.springframework.http.HttpStatus;

public class NoSuchItemException extends BaseException {
    public NoSuchItemException(String message, HttpStatus status) {
        super(message, status);
    }
}
