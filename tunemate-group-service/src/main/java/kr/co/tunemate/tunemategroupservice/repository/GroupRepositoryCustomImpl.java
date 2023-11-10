package kr.co.tunemate.tunemategroupservice.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.util.StringUtils;
import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.co.tunemate.tunemategroupservice.dto.layertolayer.GroupSearchDto;
import kr.co.tunemate.tunemategroupservice.entity.Group;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.TimeZone;

import static kr.co.tunemate.tunemategroupservice.entity.QGroup.group;

@RequiredArgsConstructor
public class GroupRepositoryCustomImpl implements GroupRepositoryCustom {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Group> searchAll(GroupSearchDto groupSearchDto) {
        return jpaQueryFactory
                .selectFrom(group)
                .where(
                        eqHostName(groupSearchDto.getHostName()),
                        likeTitle(groupSearchDto.getTitle()),
                        likeContent(groupSearchDto.getContent()),
                        isJoinable(groupSearchDto.getJoinable())
                )
                .orderBy(group.createdAt.desc())
                .fetch();
    }

    private BooleanExpression isJoinable(Boolean joinable) {
        if (!joinable) {
            return null;
        }

        LocalDateTime now = LocalDateTime.now(TimeZone.getTimeZone("Asia/Seoul").toZoneId());

        return group.startDateTime.before(now).and(group.deadline.after(now)).and(group.closedByHost.isFalse()).and(group.participantsCnt.lt(group.capacity));
    }

    private BooleanExpression likeContent(String content) {
        if (StringUtils.isNullOrEmpty(content)) {
            return null;
        }

        return group.content.like(content);
    }

    private BooleanExpression likeTitle(String title) {
        if (StringUtils.isNullOrEmpty(title)) {
            return null;
        }

        return group.title.like(title);
    }

    private BooleanExpression eqHostName(String hostName) {
        if (StringUtils.isNullOrEmpty(hostName)) {
            return null;
        }

        return group.hostName.eq(hostName);
    }
}