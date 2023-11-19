import Props from "@/types";
import styles from "./GroupItem.module.css";
import { Group } from "@/types/group";
import { classNameWrapper } from "@/utils/className";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { Time } from "@/utils/time";

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
    <li className={classNameWrapper(styles["group-item"], className)} onClick={onGroupDetail}>
      <div style={{ width: "300px" }}>
        <h1 className={styles["group-item__info--title"]}>{item.title}</h1>
        <hr />
        <div style={{ display: "flex" }}>
          <div>
            {" "}
            <p className={styles["group-item__user"]}>글쓴이 : {item.hostName}</p>
          </div>

          <p className={styles["group-item__user"]}>
            {Time.period(item.startDateTime, item.deadline as string)}
          </p>
        </div>
      </div>
    </li>
  );
};

export default GroupItem;
