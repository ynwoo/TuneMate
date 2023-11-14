import React from "react";
import Props from "@/types";
import { Friend } from "@/types/social";
import styles from "./FriendItem.module.css";
import Icon from "@/components/icons";
import Link from "next/link";
import ProfileImage from "@/components/image/ProfileImage/ProfileImage";
import { classNameWrapper } from "@/utils/className";
import useChatRoom from "@/hooks/chat/useChatRoom";

interface FriendItemProps extends Props {
  item: Friend;
}

const FriendItem = ({ item, className }: FriendItemProps) => {
  const { unReadCount, lastMessage } = useChatRoom(item.relationId);

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
          src={item.img ?? "/favicon.ico"}
          alt="친구 프로필"
          type="friend"
        />
        <div className={styles["friend-item__user--content-container"]}>
          <p className={styles["friend-item__user--name"]}>{item.name}</p>
          <p className={styles["friend-item__user--message"]}>
            {lastMessage?.content}
          </p>
        </div>
      </Link>
      <div
        className={classNameWrapper(
          styles["friend-item"],
          styles["friend-item__icon-container"]
        )}
      >
        <Link
          className={styles["friend-item__icon"]}
          href={`/profile/${item.relationId}`}
        >
          <Icon.Music size="xl" />
        </Link>
        <Link
          className={classNameWrapper(styles["friend-item__icon"])}
          href={`/friends/${item.relationId}/${item.friendId}`}
        >
          <Icon.Message size="xl" />
          {unReadCount > 0 && (
            <p className={styles["friend-item__icon--chat-count"]}>
              {unReadCount}
            </p>
          )}
        </Link>
      </div>
    </li>
  );
};

export default FriendItem;
