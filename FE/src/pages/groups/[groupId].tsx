import ConcertInfoItem from "@/components/concert/ConcertInfoItem/ConcertInfoItem";
import ConcertItem from "@/components/concert/ConcertItem/ConcertItem";
import useConcertDetailQuery from "@/hooks/queries/concert/useConcertDetailQuery";
import useGroupQuery from "@/hooks/queries/group/useGroupQuery";
import { Time } from "@/utils/time";
import { useParams } from "next/navigation";
import styles from "@/styles/GroupPage.module.css";
import ButtonWithModal from "@/components/button/ButtonWithModal";
import useParticipateGroupMutation from "@/hooks/mutations/group/useParticipateGroupMutation";
import { useCallback, useMemo } from "react";
import useMyGroupIdsQuery from "@/hooks/queries/group/useMyGroupIdsQuery";
import useSentParticipationGroupIdsQuery from "@/hooks/queries/group/useSentParticipationGroupIdsQuery";
import Button from "@/components/button/Button";
import useDeleteGroupMutation from "@/hooks/mutations/group/useDeleteGroupMutation";
import useUserInfo from "@/hooks/useUserInfo";

const GroupDetail = () => {
  const params = useParams();
  const groupId = (params?.groupId as string) ?? "";
  const userInfo = useUserInfo();
  const { data: group } = useGroupQuery(groupId);
  const { data: concert } = useConcertDetailQuery(group?.concertId ?? 0);
  const { mutate: deleteGroup } = useDeleteGroupMutation();
  const { mutate: participateGroup } = useParticipateGroupMutation();
  const { data: myGroupIds } = useMyGroupIdsQuery();
  const { data: mySentGroupIds } = useSentParticipationGroupIdsQuery();

  const isParticipated = useMemo(() => {
    if (!myGroupIds || !group) return false;
    return myGroupIds.includes(groupId);
  }, [myGroupIds, groupId]);

  const isSent = useMemo(() => {
    if (!mySentGroupIds || !group) return false;
    return mySentGroupIds.includes(groupId);
  }, [mySentGroupIds, groupId]);

  const onParticipate = useCallback(() => {
    participateGroup(groupId);
  }, [participateGroup, groupId]);

  const onDelete = useCallback(() => {
    if (groupId) {
      deleteGroup(groupId);
    }
  }, [deleteGroup, groupId]);

  return (
    <div className={styles.body}>
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
              <hr />
              <ConcertInfoItem
                className={styles["group-detail-page__description-item"]}
                title="인원수"
                description={`${group.participantsCnt} / ${group.capacity}`}
              />
              <hr />
              <ConcertInfoItem
                className={styles["group-detail-page__description-item"]}
                title="내용"
                description={group.content}
              />
              <hr />
              <ConcertInfoItem
                className={styles["group-detail-page__description-item"]}
                title="모집날짜"
                description={Time.period(group.startDateTime, group.deadline as string)}
              />
              {/* <hr /> */}
            </div>
            <div className={styles["group-detail-page__button-container"]}>
              {userInfo?.userId === group?.hostId ? (
                <>
                  <Button
                    className={styles["group-detail-page__button"]}
                    color="blue"
                    onClick={onDelete}
                  >
                    수정
                  </Button>
                  <ButtonWithModal
                    className={styles["group-detail-page__button"]}
                    color="red"
                    modalMessage="공고를 삭제하시겠습니까?"
                    onClick={onDelete}
                  >
                    삭제
                  </ButtonWithModal>
                </>
              ) : (
                <>
                  {isParticipated && (
                    <Button color="red" onClick={() => {}}>
                      가입 완료
                    </Button>
                  )}

                  {isSent && (
                    <Button color="red" onClick={() => {}}>
                      신청 완료
                    </Button>
                  )}

                  {!isParticipated && !isSent && (
                    <ButtonWithModal
                      color="blue"
                      modalMessage="참가 신청 하시겠습니까?"
                      onClick={onParticipate}
                    >
                      신청
                    </ButtonWithModal>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GroupDetail;
