package com.tunemate.social.tunematesocial.exception;

import com.tunemate.social.tunematesocial.exception.code.ErrorCode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class BaseException extends RuntimeException {
	private final ErrorCode errorCode;
}
