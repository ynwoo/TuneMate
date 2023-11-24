package com.tunemate.social.tunematesocial.exception.code;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SocialErrorCode implements ErrorCode {
	ALREADY_FRIEND(HttpStatus.BAD_REQUEST, "Already friend"),
	ALREADY_SENT_REQUEST(HttpStatus.CONFLICT, "Friend request already sent"),

	FRIEND_REQUEST_NOT_FOUND(HttpStatus.NOT_FOUND, "Friend request not found"),

	RELATION_ID_NOT_FOUND(HttpStatus.NOT_FOUND, "Relation ID not found"),
	HOST_ID_NOT_FOUND(HttpStatus.NOT_FOUND, "Host ID not found for playlist ID"),

	NOT_AUTHORITY(HttpStatus.FORBIDDEN, "접근 권한이 없습니다.");

	private final HttpStatus httpStatus;
	private final String message;
}
