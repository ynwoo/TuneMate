import styles from "@/styles/ChatPage.module.css";
import ChatList from "@/components/chat/ChatList/ChatList";
import Search from "@/components/input/Search/Search";
import useChatsQuery from "@/hooks/queries/social/useChatsQuery";
import useChat from "@/hooks/chat/useChat";
import Props from "@/types";
import { MessageRequest } from "@/types/chat";
import { ChatFilter } from "@/utils/filter";
import { useParams } from "next/navigation";
import { useMemo, useCallback, useState, ChangeEvent, useEffect } from "react";
import { Storage } from "@/utils/storage";
import ChatNavbar from "@/components/navbar/ChatNavbar/ChatNavbar";
import useModal from "@/hooks/useModal";
import Modal from "@/components/modal/Modal";
import ChatMenu from "@/components/chat/ChatMenu/ChatMenu";
import useDeleteSocialFriendMutation from "@/hooks/mutations/social/useDeleteSocialFriendMutation";
import useDisconnectChatRoomMutation from "@/hooks/mutations/social/useDisconnectChatRoomMutation";
import useConnectChatRoomMutation from "@/hooks/mutations/social/useConnectChatRoomMutation";
import Confirm from "@/components/modal/Confirm";

interface ChatPageProps extends Props {}

const ChatPage = ({}: ChatPageProps) => {
  const [content, setContent] = useState<string>("");
  const params = useParams();
  const relationId = Number(params?.relationId ?? -1);

  const friendId = params?.friendId as string;
  const [messageRequest, setMessageRequest] = useState<MessageRequest>(
    {} as MessageRequest
  );

  const { publish, chatRooms } = useChat();
  const { data: prevChatRoom } = useChatsQuery(relationId);

  const { closeToggle, isOpen, openToggle } = useModal();
  const deleteModal = useModal();
  const { mutate: deleteSocialFriend } = useDeleteSocialFriendMutation();
  const { mutate: connectChatRoom } = useConnectChatRoomMutation();
  const { mutate: disconnectChatRoom } = useDisconnectChatRoomMutation();

  // 현재 채팅방 정보 (채팅기록)
  const chatRoom = useMemo(() => {
    const newChatRoom = chatRooms.find(
      ({ chatRoomId }) => chatRoomId === relationId
    );
    if (!newChatRoom) return prevChatRoom;
    return ChatFilter.chatRoom(newChatRoom);
  }, [prevChatRoom, chatRooms, relationId]);

  // search에 메시지를 입력했을 때 호출되는 함수
  const onInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.currentTarget.value);
  }, []);

  // search의 전송 버튼을 클릭했을 때 호출되는 함수
  const onSubmit = useCallback(() => {
    publish({ ...messageRequest, content });
    setContent("");
  }, [publish, messageRequest, content]);

  // 스크롤 가장 하단으로 내리기
  const moveScrollDown = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  useEffect(() => {
    moveScrollDown();
  });

  useEffect(() => {
    if (relationId < 0) return;

    const messageRequest = {
      content: "",
      relationId,
      senderName: Storage.getUserName(),
      senderNo: Storage.getUserId(),
      time: "",
    };

    setMessageRequest(messageRequest);
    connectChatRoom(relationId);
    publish(messageRequest);
    return () => {
      disconnectChatRoom(relationId);
    };
  }, [relationId]);

  return (
    <>
      <div className={styles["chat-page"]}>
        <ChatNavbar
          className={styles["chat-page__chat-navbar"]}
          onModal={openToggle}
        />
        {/* <div className={styles["chat-page__button--scroll-down"]} onClick={moveScrollDown}>
        <Icon.Down />
      </div> */}
        {chatRoom && (
          <ChatList
            className={styles["chat-page__chat-list"]}
            chatRoom={ChatFilter.chatRoom(chatRoom)}
          />
        )}
      </div>
      <Modal
        isOpen={isOpen}
        toggle={closeToggle}
        className={styles["chat-page__modal-container"]}
      >
        <ChatMenu
          className={styles["chat-page__modal"]}
          onDelete={deleteModal.openToggle}
          // onDelete={() => deleteSocialFriend(friendId)}
        />
      </Modal>
      <Search
        className={styles["chat-page__search"]}
        value={content}
        onInput={onInput}
        onSubmit={onSubmit}
        type="chat"
      />
      <Confirm
        closeToggle={deleteModal.closeToggle}
        isOpen={deleteModal.isOpen}
        modalMessage="친구 삭제 하시겠습니까?"
        onClick={() => deleteSocialFriend(friendId)}
      />
    </>
  );
};

export default ChatPage;
