import Props from "@/types";
import styles from "./ChatItem.module.css";
import { classNameWrapper } from "@/utils/className";
import { MessageResponse } from "@/types/chat";
import { Storage } from "@/utils/storage";
import { useMemo } from "react";
import ProfileImage from "@/components/image/ProfileImage/ProfileImage";
import Icon from "@/components/icons";
import { Time } from "@/utils/time";

interface ChatItemProps extends Props {
  item: MessageResponse;
}

const ChatItem = ({ className, item }: ChatItemProps) => {
  const isMyChat = useMemo(
    () => Storage.getUserId() === item.senderNo,
    [item.senderNo]
  );

  return (
    <li
      className={classNameWrapper(
        styles["chat-item"],
        !isMyChat && styles["reverse"],
        className
      )}
    >
      <p className={styles["chat-item__image"]}>
        <Icon.Profile />
        {/* <ProfileImage src="" alt="" type="friend" /> */}
      </p>
      <div className={styles["chat-item__content"]}>
        <p className={styles["chat-item__content--name"]}>{item.senderName}</p>
        <div className={styles["chat-item__content-container"]}>
          <p className={styles["chat-item__content--text"]}>{item.content}</p>
          <div className={styles["chat-item__content--info-container"]}>
            {item.readCount && (
              <p className={styles["chat-item__content--info"]}>
                {item.readCount}
              </p>
            )}
            <p className={styles["chat-item__content--time"]}>
              {Time.hourAndMinute(item.time)}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ChatItem;
