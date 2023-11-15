import React, { MouseEvent, useCallback } from "react";
import Props from "@/types";
import { Friend } from "@/types/social";
import styles from "./FriendItem.module.css";
import Icon from "@/components/icons";
import Link from "next/link";
import ProfileImage from "@/components/image/ProfileImage/ProfileImage";
import { classNameWrapper } from "@/utils/className";
import useChatRoom from "@/hooks/chat/useChatRoom";
import { useRouter } from "next/router";
import { Time } from "@/utils/time";

interface FriendItemProps extends Props {
  item: Friend;
}

const FriendItem = ({ item, className }: FriendItemProps) => {
  const { unReadCount, lastMessage } = useChatRoom(item.relationId);
  const router = useRouter();

  const onChat = useCallback((e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    router.push(`/friends/${item.relationId}/${item.friendId}`);
  }, []);

  const onProfile = useCallback((e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    router.push(`/profile/${item.friendId}`);
  }, []);

  const onSharedProfile = useCallback((e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    router.push(`/profile/${item.friendId}`);
  }, []);

  console.log("unReadCount", unReadCount);

  return (
    <li
      className={[styles["friend-item-container"], className].join(" ")}
      onClick={onChat}
    >
      <div
        className={classNameWrapper(
          styles["friend-item"],
          styles["friend-item__user"]
        )}
      >
        <ProfileImage
          onClick={onProfile}
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
      </div>
      <div
        className={classNameWrapper(
          styles["friend-item"],
          styles["friend-item__icon-container"]
        )}
      >
        <div className={classNameWrapper(styles["friend-item__icon"])}>
          {lastMessage && (
            <p className={styles["friend-item__icon--chat-time"]}>
              {Time.createAt(lastMessage.time)}
            </p>
          )}
          {unReadCount > 0 && (
            <p className={styles["friend-item__icon--chat-count"]}>
              {unReadCount}
            </p>
          )}
        </div>
        <div className={styles["friend-item__icon"]} onClick={onSharedProfile}>
          <Icon.Music size="xl" />
        </div>
      </div>
    </li>
  );
};

export default FriendItem;
