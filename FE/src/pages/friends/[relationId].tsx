import styles from "@/styles/ChatPage.module.css";
import ChatList from "@/components/chat/ChatList/ChatList";
import Search from "@/components/input/Search/Search";
import useChatsQuery from "@/hooks/queries/social/useChatsQuery";
import useChat from "@/hooks/useChat";
import Props from "@/types";
import { MessageRequest } from "@/types/chat";
import { ChatFilter } from "@/utils/filter";
import { useParams } from "next/navigation";
import { useMemo, useCallback, useState, ChangeEvent, useEffect } from "react";
import { Storage } from "@/utils/storage";
import { Button } from "react-bootstrap";
import ChatNavbar from "@/components/navbar/ChatNavbar/ChatNavbar";

interface ChatPageProps extends Props {}

const ChatPage = ({}: ChatPageProps) => {
  const [content, setContent] = useState<string>("");
  const params = useParams();
  const relationId = Number(params?.relationId as string);

  const { connect, subscribe, publish, chatRooms } = useChat();
  const { data: prevChatRoom } = useChatsQuery(relationId);

  const chatRoom = useMemo(() => {
    const newChatRoom = chatRooms.find(
      ({ chatRoomId }) => chatRoomId === relationId
    );
    if (!prevChatRoom || !newChatRoom) return undefined;
    newChatRoom.messages = [...prevChatRoom.messages, ...newChatRoom.messages];
    return ChatFilter.chatRoom(newChatRoom);
  }, [prevChatRoom, chatRooms, relationId]);

  const messageRequest: MessageRequest = useMemo(
    () => ({
      content: "",
      relationId,
      senderName: Storage.getUserName(),
      senderNo: Storage.getUserId(),
    }),
    [relationId]
  );

  // search에 메시지를 입력했을 때 호출되는 함수
  const onInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.currentTarget.value);
  }, []);

  // search의 전송 버튼을 클릭했을 때 호출되는 함수
  const onSubmit = useCallback(() => {
    publish({ ...messageRequest, content });
    setContent("");
    console.log(content);
  }, [publish, messageRequest, content]);

  const moveScrollDown = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  useEffect(() => {
    moveScrollDown();
  }, []);

  return (
    <div className={styles["chat-page"]}>
      <ChatNavbar className={styles["chat-page__chat_navbar"]} />
      <Search
        className={styles["chat-page__search"]}
        value={content}
        onInput={onInput}
        onSubmit={onSubmit}
      />
      {chatRoom && <ChatList chatRoom={ChatFilter.chatRoom(chatRoom)} />}
      <Button onClick={connect}>connect</Button>
      <Button onClick={() => subscribe(relationId)}>subscribe</Button>
      <Button onClick={() => publish(messageRequest)}>publish</Button>
      <Button
        className={styles["chat-page__button--scroll-down"]}
        onClick={moveScrollDown}
      >
        아래로
      </Button>
    </div>
  );
};

export default ChatPage;
