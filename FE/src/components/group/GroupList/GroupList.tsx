import Props from "@/types";
import styles from "./GroupList.module.css";
import { Group } from "@/types/group";
import { classNameWrapper } from "@/utils/className";
import GroupItem from "../GroupItem/GroupItem";

interface GroupListProps extends Props {
  groups: Group[];
}

const GroupList = ({ className, groups }: GroupListProps) => {
  return (
    <ul className={classNameWrapper(styles["group-list"], className)}>
      {groups.map((group) => (
        <GroupItem className={styles["group-list__item"]} item={group} />
      ))}
    </ul>
  );
};

export default GroupList;
