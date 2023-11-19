import ProfileImage from "@/components/image/ProfileImage/ProfileImage";
import useAnotherUserInfoQuery from "@/hooks/queries/user/useAnotherUserInfoQuery";
import Props from "@/types";
import { UserInfo } from "@/types/user";
import { classNameWrapper } from "@/utils/className";
import styles from "./RequestItem.module.css";
import Button from "@/components/button/Button";

interface RequestItem {
  userId: UserInfo["userId"];
  name: UserInfo["name"];
}

interface RequestItemProps extends Props {
  item: RequestItem;
  onAccept?: (userId: UserInfo["userId"]) => void;
  onDecline?: (userId: UserInfo["userId"]) => void;
}

const RequestItem = ({ item, onAccept, onDecline, className }: RequestItemProps) => {
  const { data: userInfo } = useAnotherUserInfoQuery(item.userId);

  return (
    <li className={classNameWrapper(styles["request-item"], className)}>
      {userInfo && (
        <>
          <ProfileImage
            className={styles["request-item__image"]}
            src={userInfo.imageUrl}
            alt={userInfo.name}
            type="friend"
          />
          <p className={styles["request-item__name"]}>{item.name}</p>
          <div className={styles["request-item__button-container"]}>
            {onAccept && (
              <Button
                className={styles["request-item__button"]}
                onClick={() => onAccept(item.userId)}
                color="blue"
              >
                수락
              </Button>
            )}
            {onDecline && (
              <Button
                className={styles["request-item__button"]}
                onClick={() => onDecline(item.userId)}
                color="red"
              >
                거절
              </Button>
            )}
          </div>
        </>
      )}
    </li>
  );
};

export default RequestItem;
