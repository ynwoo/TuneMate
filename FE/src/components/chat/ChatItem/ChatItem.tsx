import Props from "@/types";
import styles from "./ChatItem.module.css";
import { classNameWrapper } from "@/utils/className";
import { MessageResponse } from "@/types/chat";

interface ChatItemProps extends Props {
  item: MessageResponse;
}

const ChatItem = ({ className, item }: ChatItemProps) => {
  return (
    <li className={classNameWrapper(styles["chat-item"], className)}>
      <p className={styles["chat-item__image"]}>{item.senderName}</p>
      <p className={styles["chat-item__text"]}>{item.content}</p>
    </li>
  );
};

export default ChatItem;
