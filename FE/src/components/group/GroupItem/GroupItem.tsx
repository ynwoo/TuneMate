import Props from "@/types";
import styles from "./GroupItem.module.css";
import { Group } from "@/types/group";
import { classNameWrapper } from "@/utils/className";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { Time } from "@/utils/time";
import useUserInfoQuery from "@/hooks/queries/user/useUserInfoQuery";

interface GroupItemProps extends Props {
  item: Group;
}

const GroupItem = ({ className, item }: GroupItemProps) => {
  const router = useRouter();

  const onGroupDetail = useCallback(() => {
    router.push(`/groups/${item.groupId}`);
  }, []);

  //   const { data: userInfo } = useUserInfoQuery(item.hostId);

  return (
    <li
      className={classNameWrapper(styles["group-item"], className)}
      onClick={onGroupDetail}
    >
      <p className={styles["group-item__user"]}>{item.hostName}</p>
      <div className={styles["group-item__info"]}>
        <h1 className={styles["group-item__info--title"]}>{item.title}</h1>
        <p className={styles["group-item__info--time"]}>
          {Time.period(item.startDateTime, item.deadline)}
        </p>
      </div>
    </li>
  );
};

export default GroupItem;
