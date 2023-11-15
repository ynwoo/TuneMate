import ConcertInfoItem from "@/components/concert/ConcertInfoItem/ConcertInfoItem";
import ConcertItem from "@/components/concert/ConcertItem/ConcertItem";
import useConcertDetailQuery from "@/hooks/queries/concert/useConcertDetailQuery";
import useGroupQuery from "@/hooks/queries/group/useGroupQuery";
import { Time } from "@/utils/time";
import { useParams } from "next/navigation";
import styles from "@/styles/GroupPage.module.css";
import ButtonWithModal from "@/components/button/ButtonWithModal";
import useParticipateGroupMutation from "@/hooks/mutations/group/useParticipateGroupMutation";
import { useCallback } from "react";

const GroupDetail = () => {
  const params = useParams();
  const groupId = params.groupId as string;
  const { data: group } = useGroupQuery(groupId);
  const { data: concert } = useConcertDetailQuery(group?.concertId ?? 0);
  const { mutate: participateGroup } = useParticipateGroupMutation();

  const onParticipate = useCallback(() => {
    participateGroup(groupId);
  }, [participateGroup, groupId]);

  return (
    <div className={styles["group-detail-page"]}>
      {group && (
        <>
          <h1 className={styles["group-detail-page__title"]}>{group.title}</h1>
          {concert && <ConcertItem item={concert} />}
          <div className={styles["group-detail-page__description"]}>
            <ConcertInfoItem
              className={styles["group-detail-page__description-item"]}
              title="호스트"
              description={group.hostName}
            />
            <ConcertInfoItem
              className={styles["group-detail-page__description-item"]}
              title="인원수"
              description={`${group.participantsCnt} / ${group.capacity}`}
            />
            <ConcertInfoItem
              className={styles["group-detail-page__description-item"]}
              title="내용"
              description={group.content}
            />
            <ConcertInfoItem
              className={styles["group-detail-page__description-item"]}
              title="모집날짜"
              description={Time.period(
                group.startDateTime,
                group.deadline as string
              )}
            />
          </div>
          <ButtonWithModal
            color="blue"
            modalMessage="참가 신청 하시겠습니까?"
            onClick={onParticipate}
          >
            신청
          </ButtonWithModal>
        </>
      )}
    </div>
  );
};

export default GroupDetail;
