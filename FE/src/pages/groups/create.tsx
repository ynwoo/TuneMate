import ButtonWithModal from "@/components/button/ButtonWithModal";
import GroupCreate from "@/components/group/GroupCreate/GroupCreate";
import useCreateGroupMutation from "@/hooks/mutations/group/useCreateGroupMutation";
import { GroupAnnouncement } from "@/types/group";
import { useState, ChangeEvent, useCallback } from "react";
import styles from "@/styles/GroupPage.module.css";

export const initGroupAnnouncement: GroupAnnouncement = {
  capacity: 0,
  concertId: 0,
  content: "",
  deadline: "",
  title: "",
};

const GroupCreatePage = () => {
  const { mutate: createGroup } = useCreateGroupMutation();

  const [group, setGroup] = useState<GroupAnnouncement>(initGroupAnnouncement);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | number) => {
      if (typeof e === "number") {
        setGroup((group) => ({
          ...group,
          concertId: e,
        }));
        return;
      }

      const { name, value } = e.currentTarget as {
        name: keyof GroupAnnouncement;
        value: string;
      };

      let _value: string | number = "";
      if (name === "capacity") {
        _value = Number(value);
      } else {
        _value = value;
      }

      setGroup((group) => ({
        ...group,
        [name]: _value,
      }));
    },
    [setGroup]
  );

  const onClick = useCallback(() => {
    createGroup({ ...group, deadline: new Date(group.deadline) });
  }, [group, createGroup]);

  return (
    <div className={styles["group-create-page"]}>
      <GroupCreate onChange={onChange} group={group} />
      <ButtonWithModal
        className={styles["group-create-page__button"]}
        color="blue"
        modalMessage="그룹을 생성하시겠습니까?"
        onClick={onClick}
      >
        생성
      </ButtonWithModal>
    </div>
  );
};

export default GroupCreatePage;
