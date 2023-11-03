package com.example.tunemateuserservice.exception;

import org.springframework.http.HttpStatus;

public class InvalidRefreshTokenException extends BaseException {
    public InvalidRefreshTokenException(String message, HttpStatus status) {
        super(message, status);
    }
}
