import Props from "@/types";
import ChatItem from "../ChatItem/ChatItem";
import styles from "./ChatList.module.css";
import { ChatRoom } from "@/types/chat";
import { classNameWrapper } from "@/utils/className";

interface ChatListProps extends Props {
  chatRoom: ChatRoom;
}

const ChatList = ({ chatRoom, className }: ChatListProps) => {
  return (
    <ul className={classNameWrapper(styles["chat-list"], className)}>
      {chatRoom.messages.map((message) => (
        <ChatItem
          key={message.time}
          className={styles["chat-list__item"]}
          item={message}
        />
      ))}
    </ul>
  );
};

export default ChatList;
