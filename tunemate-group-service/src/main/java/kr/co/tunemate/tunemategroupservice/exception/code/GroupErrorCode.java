package kr.co.tunemate.tunemategroupservice.exception.code;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
public enum GroupErrorCode implements ErrorCode {
    ILLEGAL_REQUEST(HttpStatus.BAD_REQUEST, "유효하지 않은 요청입니다."),
    NO_AUTHORIZATION_FOR_ITEM_EXCEPTION(HttpStatus.FORBIDDEN, "접근 권한이 없습니다."),
    NO_SUCH_ITEM_EXCEPTION(HttpStatus.NOT_FOUND, "존재하지 않는 리소스입니다.");

    private final HttpStatus httpStatus;
    private final String message;

    @Override
    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
