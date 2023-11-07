package kr.co.tunemate.tunemategroupservice.controller;

import io.swagger.v3.oas.annotations.Operation;
import kr.co.tunemate.tunemategroupservice.dto.GroupDto;
import kr.co.tunemate.tunemategroupservice.service.GroupService;
import kr.co.tunemate.tunemategroupservice.vo.RequestGroup;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController("/groups")
@RequiredArgsConstructor
public class GroupController {
    private final GroupService groupService;
    private final ModelMapper modelMapper;

    @Operation(description = "공고를 생성합니다.")
    @PostMapping
    public ResponseEntity saveGroup(@RequestHeader("UserId") String userId, @RequestBody RequestGroup requestGroup) {
        GroupDto groupDto = modelMapper.map(requestGroup, GroupDto.class);
        groupService.saveGroup(groupDto);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
