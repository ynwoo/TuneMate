package kr.co.tunemate.tunemateuserservice.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BaseException.class)
    public ResponseEntity customExceptionHandler(BaseException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }
}
