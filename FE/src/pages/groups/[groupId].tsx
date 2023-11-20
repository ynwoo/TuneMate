import ConcertInfoItem from "@/components/concert/ConcertInfoItem/ConcertInfoItem";
import ConcertItem from "@/components/concert/ConcertItem/ConcertItem";
import useConcertDetailQuery from "@/hooks/queries/concert/useConcertDetailQuery";
import useGroupQuery from "@/hooks/queries/group/useGroupQuery";
import { Time } from "@/utils/time";
import { useParams } from "next/navigation";
import styles from "@/styles/GroupPage.module.css";
import ButtonWithModal from "@/components/button/ButtonWithModal";
import useParticipateGroupMutation from "@/hooks/mutations/group/useParticipateGroupMutation";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import useMyGroupIdsQuery from "@/hooks/queries/group/useMyGroupIdsQuery";
import useSentParticipationGroupIdsQuery from "@/hooks/queries/group/useSentParticipationGroupIdsQuery";
import Button from "@/components/button/Button";
import useDeleteGroupMutation from "@/hooks/mutations/group/useDeleteGroupMutation";
import useUserInfo from "@/hooks/useUserInfo";
import Input from "@/components/input/Input/Input";
import { Group } from "@/types/group";
import useUpdateGroupMutation from "@/hooks/mutations/group/useUpdateGroupMutation";
import TextArea from "@/components/input/TextArea/TextArea";
import { useRouter } from "next/router";

const GroupDetail = () => {
  const params = useParams();
  const groupId = (params?.groupId as string) ?? "";
  const userInfo = useUserInfo();
  const { data: group } = useGroupQuery(groupId);
  const { data: concert } = useConcertDetailQuery(group?.concertId ?? 0);
  const { mutate: deleteGroup } = useDeleteGroupMutation();
  const { mutate: participateGroup } = useParticipateGroupMutation();
  const { mutate: updateGroup } = useUpdateGroupMutation();
  const { data: myGroupIds } = useMyGroupIdsQuery();
  const { data: mySentGroupIds } = useSentParticipationGroupIdsQuery();
  const [isModify, setIsModify] = useState<boolean>(false);
  const [newGroup, setNewGroup] = useState<Group>({} as Group);
  const router = useRouter();

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

  const onModify = useCallback(() => {
    updateGroup({ groupId: newGroup.groupId, groupAnnouncement: newGroup });
    setNewGroup(newGroup);
    setIsModify(false);
  }, [newGroup]);

  const onModifyToggle = useCallback(() => {
    setIsModify((isModify) => !isModify);
    if (group) {
      setNewGroup(group);
    }
  }, [group]);

  const onChange = useCallback(
    (
      e:
        | ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
          >
        | number
    ) => {
      if (typeof e === "number") {
        setNewGroup(
          (group) =>
            group && {
              ...group,
              concertId: e,
            }
        );
        return;
      }

      const { name, value } = e.currentTarget as {
        name: keyof Group;
        value: string;
      };

      let _value: string | number = "";

      switch (name) {
        case "capacity":
          _value = Number(value);
          break;
        case "deadline":
          _value = `${value}T00:00:00`;
          break;
        default:
          _value = value;
          break;
      }

      setNewGroup(
        (group) =>
          group && {
            ...group,
            [name]: _value,
          }
      );
    },
    [setNewGroup]
  );

  return (
    <div className={styles.body}>
      <div className={styles["group-detail-page"]}>
        {group && (
          <>
            {isModify ? (
              <input
                className={styles["group-detail-page__title--input"]}
                name="title"
                onChange={onChange}
                value={newGroup.title}
              />
            ) : (
              <h1 className={styles["group-detail-page__title"]}>
                {group.title}
              </h1>
            )}

            {concert && <ConcertItem item={concert} />}
            <div className={styles["group-detail-page__description"]}>
              <ConcertInfoItem
                className={styles["group-detail-page__description-item"]}
                title="호스트"
                description={group.hostName}
                onClick={() => router.push(`/profile/${group.hostId}`)}
              />
              {isModify ? (
                <>
                  <Input
                    className={
                      styles["group-detail-page__description-item--input"]
                    }
                    label="정원"
                    name="capacity"
                    onChange={onChange}
                    value={newGroup.capacity}
                    type="number"
                  />
                  <TextArea
                    className={
                      styles["group-detail-page__description-item--input"]
                    }
                    label="내용"
                    name="content"
                    onChange={onChange}
                    value={newGroup.content}
                  />
                  <Input
                    className={
                      styles["group-detail-page__description-item--input"]
                    }
                    label="마감일"
                    name="deadline"
                    onChange={onChange}
                    value={Time.yyyyMMdd(String(newGroup.deadline))}
                    type="date"
                  />
                </>
              ) : (
                <>
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
                  {group.userInfos.length > 1 && (
                    <p
                      className={
                        styles["group-detail-page__description-item--detail"]
                      }
                    >
                      <>
                        [{" "}
                        {group.userInfos
                          .filter(({ name }) => name !== group.hostName)
                          .map(({ name, userId }, index) => (
                            <span
                              className={
                                styles[
                                  "group-detail-page__description-item--detail-item"
                                ]
                              }
                              onClick={() => router.push(`/profile/${userId}`)}
                            >
                              {name}
                              {index !== group.userInfos.length - 2 && ", "}
                            </span>
                          ))}{" "}
                        ]
                      </>
                    </p>
                  )}
                </>
              )}
            </div>
            <div className={styles["group-detail-page__button-container"]}>
              {userInfo?.userId === group.hostId ? (
                isModify ? (
                  <>
                    <ButtonWithModal
                      className={styles["group-detail-page__button"]}
                      color="blue"
                      modalMessage="공고를 수정하시겠습니까?"
                      onClick={onModify}
                    >
                      수정
                    </ButtonWithModal>
                    <Button
                      className={styles["group-detail-page__button"]}
                      color="red"
                      onClick={onModifyToggle}
                    >
                      취소
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className={styles["group-detail-page__button"]}
                      color="blue"
                      onClick={onModifyToggle}
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
                )
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
