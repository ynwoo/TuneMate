import React, { useMemo } from "react";
import Props from "@/types";
import { Friend } from "@/types/social";
import styles from "./FriendItem.module.css";
import Icon from "@/components/icons";
import Link from "next/link";
import ProfileImage from "@/components/image/ProfileImage/ProfileImage";
import { classNameWrapper } from "@/utils/className";
import useChat from "@/hooks/useChat";
import { Storage } from "@/utils/storage";
import { CHAT } from "@/constants/chat";
import { ChatFilter } from "@/utils/filter";

interface FriendItemProps extends Props {
  item: Friend;
}

const FriendItem = ({ item, className }: FriendItemProps) => {
  const { chatRooms } = useChat();

  // 해당하는 채팅방
  const chatRoom = useMemo(
    () => chatRooms.find(({ chatRoomId }) => chatRoomId === item.relationId),
    [chatRooms, item.relationId]
  );

  // 상대방이 보낸 메시지 중에서 안 읽은 메시지 개수
  const unReadCount = useMemo(() => {
    if (!chatRoom) return 0;

    return ChatFilter.messages(chatRoom.messages).filter(
      ({ readCount, senderNo }) =>
        senderNo !== Storage.getUserId() && readCount === CHAT.unRead
    ).length;
  }, [chatRoom]);

  return (
    <li className={[styles["friend-item-container"], className].join(" ")}>
      <Link
        href={`/profile/${item.friendId}`}
        className={classNameWrapper(
          styles["friend-item"],
          styles["friend-item__user"]
        )}
      >
        <ProfileImage
          className={styles["friend-item__user--image"]}
          src="https://i.scdn.co/image/ab67757000003b824e172b7776591b79a63fcea9"
          alt="친구 프로필"
          type="friend"
        />
        <p>{item.name}</p>
      </Link>
      <div
        className={classNameWrapper(
          styles["friend-item"],
          styles["friend-item__icon-container"]
        )}
      >
        <Link
          className={styles["friend-item__icon"]}
          href={`/friends/${item.relationId}`}
        >
          <Icon.Message size="xl" />
          {unReadCount}
        </Link>
        <Link
          className={styles["friend-item__icon"]}
          href={`/profile/${item.relationId}`}
        >
          <Icon.Music size="xl" />
        </Link>
      </div>
    </li>
  );
};

export default FriendItem;
