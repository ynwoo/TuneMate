package kr.co.tunemate.tunematemeetingservice.exception;


import org.springframework.http.HttpStatus;

public abstract class BaseException extends RuntimeException {

    private HttpStatus responseStatus;

    public BaseException() {
        super();
    }

    public BaseException(String message, HttpStatus httpResponseStatus) {
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
