package kr.co.tunemate.tunemategroupservice.controller;

import io.swagger.v3.oas.annotations.Operation;
import kr.co.tunemate.tunemategroupservice.dto.GroupDto;
import kr.co.tunemate.tunemategroupservice.dto.GroupSearchDto;
import kr.co.tunemate.tunemategroupservice.service.GroupService;
import kr.co.tunemate.tunemategroupservice.vo.RequestGroup;
import kr.co.tunemate.tunemategroupservice.vo.ResponseGroup;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/groups")
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

    @Operation(description = "공고 UUID로 공고를 조회합니다.")
    @GetMapping("/{groupId}")
    public ResponseEntity<ResponseGroup> getGroupByGroupId(@RequestHeader("UserId") String userId, @PathVariable String groupId) {
        GroupDto groupDto = groupService.getGroupByGroupId(groupId);
        ResponseGroup responseGroup = modelMapper.map(groupDto, ResponseGroup.class);

        return ResponseEntity.ok(responseGroup);
    }

    @Operation(description = "공고를 수정합니다.")
    @PutMapping
    public ResponseEntity<ResponseGroup> putGroup(@RequestHeader("UserId") String userId, @RequestBody RequestGroup requestGroup) {
        GroupDto groupDto = modelMapper.map(requestGroup, GroupDto.class);
        GroupDto returnGroupDto = groupService.putGroup(userId, groupDto);
        ResponseGroup responseGroup = modelMapper.map(returnGroupDto, ResponseGroup.class);

        return ResponseEntity.ok(responseGroup);
    }

    @Operation(description = "공고 작성자가 공고를 마감합니다.")
    @PatchMapping("/{groupId}")
    public ResponseEntity closeGroup(@RequestHeader("UserId") String userId, @PathVariable String groupId) {
        groupService.closeGroup(userId, groupId);

        return ResponseEntity.ok().build();
    }

    @Operation(description = "공고 목록을 조회합니다.")
    @GetMapping
    public ResponseEntity<List<ResponseGroup>> searchAllGroup(@RequestHeader("UserId") String userId,
                                                              @RequestParam(required = false) String hostName,
                                                              @RequestParam(required = false) String title,
                                                              @RequestParam(required = false) String content,
                                                              @RequestParam(required = false) Boolean joinable) {
        GroupSearchDto groupSearchDto = GroupSearchDto.builder()
                .hostName(hostName)
                .title(title)
                .content(content)
                .joinable(joinable)
                .build();

        List<ResponseGroup> responseGroups = groupService.searchAll(groupSearchDto).stream().map(groupDto -> modelMapper.map(groupDto, ResponseGroup.class)).toList();

        return ResponseEntity.ok(responseGroups);
    }
}