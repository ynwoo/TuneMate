package kr.co.tunemate.tunemategroupservice.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.ValidationException;
import kr.co.tunemate.tunemategroupservice.dto.layertolayer.GroupDto;
import kr.co.tunemate.tunemategroupservice.dto.layertolayer.GroupSearchDto;
import kr.co.tunemate.tunemategroupservice.service.GroupService;
import kr.co.tunemate.tunemategroupservice.vo.RequestGroup;
import kr.co.tunemate.tunemategroupservice.vo.ResponseGroup;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/groups")
@RequiredArgsConstructor
public class GroupController {
    private final GroupService groupService;
    private final ModelMapper modelMapper;

    @Operation(description = "공고를 생성합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "성공"),
            @ApiResponse(responseCode = "400", description = "필수 입력 값이 없는 경우, 콘서트가 존재하지 않는 경우")
    })
    @PostMapping
    public ResponseEntity saveGroup(@RequestHeader("UserId") String userId, @RequestBody RequestGroup requestGroup) {
        GroupDto groupDto = modelMapper.map(requestGroup, GroupDto.class);
        groupService.saveGroup(groupDto);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(description = "공고 UUID로 공고를 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 groupId로 조회하는 경우")
    })
    @GetMapping("/{groupId}")
    public ResponseEntity<ResponseGroup> getGroupByGroupId(@RequestHeader("UserId") String userId, @PathVariable String groupId) {
        GroupDto groupDto = groupService.getGroupByGroupId(groupId);
        ResponseGroup responseGroup = modelMapper.map(groupDto, ResponseGroup.class);

        return ResponseEntity.ok(responseGroup);
    }

    @Operation(description = "공고를 수정합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "400", description = "필수 입력 값이 없는 경우"),
            @ApiResponse(responseCode = "403", description = "작성자가 아닌 사용자가 수정을 요청하는 경우"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 groupId로 요청하는 경우")
    })
    @PutMapping
    public ResponseEntity<ResponseGroup> putGroup(@RequestHeader("UserId") String userId, @RequestBody RequestGroup requestGroup) {
        if (ObjectUtils.isEmpty(requestGroup.getGroupId())) {
            throw new ValidationException("groupId는 null 혹은 empty 값이 될 수 없습니다.");
        }

        GroupDto groupDto = modelMapper.map(requestGroup, GroupDto.class);
        GroupDto returnGroupDto = groupService.putGroup(userId, groupDto);
        ResponseGroup responseGroup = modelMapper.map(returnGroupDto, ResponseGroup.class);

        return ResponseEntity.ok(responseGroup);
    }

    @Operation(description = "공고 작성자가 공고를 마감합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "403", description = "공고 작성자가 아닌 사람이 마감 요청할 경우"),
    })
    @PatchMapping("/{groupId}")
    public ResponseEntity closeGroup(@RequestHeader("UserId") String userId, @PathVariable String groupId) {
        groupService.closeGroup(userId, groupId);

        return ResponseEntity.ok().build();
    }

    @Operation(description = "공고 목록을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공")
    })
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

    @Operation(description = "공고를 삭제합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공")
    })
    @DeleteMapping("/{groupId}")
    public ResponseEntity deleteGroup(@RequestHeader("UserId") String userId, @PathVariable String groupId) {
        groupService.deleteGroupByGroupId(userId, groupId);

        return ResponseEntity.ok().build();
    }
}