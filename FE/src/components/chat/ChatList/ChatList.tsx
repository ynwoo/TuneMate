import Props from "@/types";
import ChatItem from "../ChatItem/ChatItem";
import styles from "./ChatList.module.css";
import { ChatRoom } from "@/types/chat";
import { classNameWrapper } from "@/utils/className";
import { Time } from "@/utils/time";

interface ChatListProps extends Props {
  chatRoom: ChatRoom;
}

const ChatList = ({ chatRoom, className }: ChatListProps) => {
  return (
    <ul className={classNameWrapper(styles["chat-list"], className)}>
      {chatRoom.messages.map((message, index, messages) => {
        const prev = Time.yyyyMMdd(messages[index - 1]?.time ?? 0);
        const cur = Time.yyyyMMdd(message.time);
        return (
          <>
            {prev !== cur && (
              <p className={styles["chat-list__date"]}>{Time.yyyyMMddD(message.time)}</p>
            )}
            <ChatItem key={message.time} className={styles["chat-list__item"]} item={message} />
          </>
        );
      })}
    </ul>
  );
};

export default ChatList;
