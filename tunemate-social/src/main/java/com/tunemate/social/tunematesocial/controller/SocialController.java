package com.tunemate.social.tunematesocial.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tunemate.social.tunematesocial.dto.request.FriendRequestDto;
import com.tunemate.social.tunematesocial.service.SocialService;

import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin(value = "*", allowedHeaders = "*")
@Slf4j
@RequestMapping("/social")
public class SocialController {
	private final SocialService socialService;

	@Autowired
	public SocialController(SocialService socialService) {
		this.socialService = socialService;
	}

	@PostMapping("friend-request")
	public ResponseEntity<?> addFriendRequest(@RequestBody FriendRequestDto friendRequestDto,
		@RequestHeader("UserId") long userId) {
		log.debug("친구 요청");
		socialService.addFriendRequest(userId, friendRequestDto);

		return ResponseEntity.ok().build();
	}

}
