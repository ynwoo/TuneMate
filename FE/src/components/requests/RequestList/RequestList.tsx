import Props from "@/types";
import RequestItem from "../RequestItem/RequestItem";
import { UserInfo } from "@/types/user";
import { classNameWrapper } from "@/utils/className";
import styles from "./RequestList.module.css";

interface RequestListProps extends Props {
  items: RequestItem[];
  onAccept?: (userId: UserInfo["userId"]) => void;
  onDecline?: (userId: UserInfo["userId"]) => void;
}

const RequestList = ({ items, onAccept, onDecline, className }: RequestListProps) => {
  return (
    <ul className={classNameWrapper(styles["request-list"], className)}>
      {items.map((item) => (
        <RequestItem
          className={styles["request-list__item"]}
          item={item}
          onAccept={onAccept}
          onDecline={onDecline}
        />
      ))}
    </ul>
  );
};

export default RequestList;
