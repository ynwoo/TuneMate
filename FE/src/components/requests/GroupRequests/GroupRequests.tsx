import useGroupReceivedParticipationsQuery from "@/hooks/queries/group/useGroupReceivedParticipationsQuery";
import RequestList from "../RequestList/RequestList";
import useAcceptGroupParticipationMutation from "@/hooks/mutations/group/useAcceptGroupParticipationMutation";
import useRejectGroupParticipationMutation from "@/hooks/mutations/group/useRejectGroupParticipationMutation";
import { GroupParticipation } from "@/types/group";
import { useCallback } from "react";
import styles from "./GroupRequests.module.css";

const GroupRequests = () => {
  const { data: groupReceivedParicipations } = useGroupReceivedParticipationsQuery();
  const { mutate: acceptGroupParticipation } = useAcceptGroupParticipationMutation();
  const { mutate: rejectGroupParticipation } = useRejectGroupParticipationMutation();

  const onAccept = useCallback(
    (groupParticipationId: GroupParticipation["groupParticipationId"]) => {
      acceptGroupParticipation(groupParticipationId);
    },
    [acceptGroupParticipation]
  );

  const onDecline = useCallback(
    (groupParticipationId: GroupParticipation["groupParticipationId"]) => {
      rejectGroupParticipation(groupParticipationId);
    },
    [rejectGroupParticipation]
  );

  const items = [
    {
      name: "노태균",
      userId: "cb899bc8-33a9-43a6-938c-76b0ec286c77",
    },
    {
      name: "노태균",
      userId: "cb899bc8-33a9-43a6-938c-76b0ec286c77",
    },
    {
      name: "노태균",
      userId: "cb899bc8-33a9-43a6-938c-76b0ec286c77",
    },
  ];
  return (
    <div className={styles["group-requests"]}>
      <RequestList
        className={styles["group-requests__request-list"]}
        items={items}
        onAccept={onAccept}
        onDecline={onDecline}
      />
    </div>
  );
};

export default GroupRequests;
