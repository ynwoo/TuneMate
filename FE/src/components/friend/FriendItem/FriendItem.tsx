import React from "react";
import Props from "@/types";
import { Friend } from "@/types/social";
import styles from "./FriendItem.module.css";
import Icon from "@/components/icons";
import Link from "next/link";
import ProfileImage from "@/components/image/ProfileImage/ProfileImage";

interface FriendItemProps extends Props {
  item: Friend;
}

const FriendItem = ({ item, className }: FriendItemProps) => {
  return (
    <li className={[styles["friend-item"], className].join(" ")}>
      <Link
        href={`/profile/${item.freindId}`}
        className={styles["friend-item__user"]}
      >
        <ProfileImage
          src="https://i.scdn.co/image/ab67757000003b824e172b7776591b79a63fcea9"
          alt="친구 프로필"
          type="friend"
        />
        <p>{item.name}</p>
      </Link>
      <div className={styles["friend-item__icons"]}>
        <Link href={`/friends/${item.relationId}`}>
          <Icon.Message size="xl" />
        </Link>
        <Link href={`/profile/${item.relationId}`}>
          <Icon.Music size="xl" />
        </Link>
      </div>
    </li>
  );
};

export default FriendItem;
