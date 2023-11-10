package kr.co.tunemate.tunemategroupservice.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BaseException.class)
    public ResponseEntity exceptionHandler(BaseException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }
}
