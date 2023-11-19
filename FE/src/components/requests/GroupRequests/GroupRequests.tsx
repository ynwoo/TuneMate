import useGroupReceivedParticipationsQuery from "@/hooks/queries/group/useGroupReceivedParticipationsQuery";
import RequestList from "../RequestList/RequestList";
import useAcceptGroupParticipationMutation from "@/hooks/mutations/group/useAcceptGroupParticipationMutation";
import useRejectGroupParticipationMutation from "@/hooks/mutations/group/useRejectGroupParticipationMutation";
import { GroupParticipation } from "@/types/group";
import { MouseEvent, useCallback, useMemo, useState } from "react";
import styles from "./GroupRequests.module.css";
import useModal from "@/hooks/useModal";
import Confirm from "@/components/modal/Confirm";
import Nothing from "@/components/nothing/Nothing/Nothing";

const GroupRequests = () => {
  const { data: groupReceivedParicipations } = useGroupReceivedParticipationsQuery();
  const { mutate: acceptGroupParticipation } = useAcceptGroupParticipationMutation();
  const { mutate: rejectGroupParticipation } = useRejectGroupParticipationMutation();
  const [groupParticipationRequestId, setGroupParticipationRequestId] = useState<string>("");
  const acceptModal = useModal();
  const declineModal = useModal();

  const onAccept = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      acceptGroupParticipation(groupParticipationRequestId);
    },
    [acceptGroupParticipation, groupParticipationRequestId]
  );

  const onDecline = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      rejectGroupParticipation(groupParticipationRequestId);
    },
    [rejectGroupParticipation, groupParticipationRequestId]
  );

  const onAcceptModal = useCallback(
    (groupParticipationRequestId: GroupParticipation["groupParticipationRequestId"]) => {
      acceptModal.openToggle();
      setGroupParticipationRequestId(groupParticipationRequestId);
    },
    [acceptModal]
  );

  const onDeclineModal = useCallback(
    (groupParticipationId: GroupParticipation["groupParticipationRequestId"]) => {
      declineModal.openToggle();
      setGroupParticipationRequestId(groupParticipationId);
    },
    [declineModal]
  );

  console.log(groupParticipationRequestId);

  const items = useMemo(
    () =>
      groupReceivedParicipations?.map(({ userInfo, groupParticipationRequestId }) => ({
        userId: userInfo?.userId ?? "",
        name: userInfo?.name ?? "",
        param: groupParticipationRequestId,
      })) ?? [],
    [groupReceivedParicipations]
  );

  console.log(items);

  if (!items?.length) {
    return <Nothing>받은 참가 요청이 없습니다.</Nothing>;
  }

  return (
    <>
      <div className={styles["group-requests"]}>
        <RequestList
          className={styles["group-requests__request-list"]}
          items={items}
          onAccept={onAcceptModal}
          onDecline={onDeclineModal}
        />
      </div>
      <Confirm
        isOpen={acceptModal.isOpen}
        closeToggle={acceptModal.closeToggle}
        modalMessage="참여요청을 수락하시겠습니까?"
        onClick={onAccept}
      />
      <Confirm
        isOpen={declineModal.isOpen}
        closeToggle={declineModal.closeToggle}
        modalMessage="참여요청을 거절하시겠습니까?"
        onClick={onDecline}
      />
    </>
  );
};

export default GroupRequests;
