import Props from "@/types";
import styles from "./ChatItem.module.css";
import { classNameWrapper } from "@/utils/className";
import { MessageResponse } from "@/types/chat";
import { Storage } from "@/utils/storage";
import { useMemo } from "react";

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
      <p className={styles["chat-item__image"]}>{item.senderName}</p>
      <p className={styles["chat-item__text"]}>{item.content}</p>
      <p className={styles["chat-item__text"]}>{item.readCount}</p>
    </li>
  );
};

export default ChatItem;
