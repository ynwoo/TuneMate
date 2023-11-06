import React from "react";
import Props from "@/types";
import { Friend } from "@/types/social";
import styles from "./FriendItem.module.css";
import Icon from "@/components/icons";
import Link from "next/link";

interface FriendItemProps extends Props {
  item: Friend;
}

const FriendItem = ({ item, className }: FriendItemProps) => {
  return (
    <div className={[styles["friend-item"], className].join(" ")}>
      <div className={styles["friend-item__user"]}>
        <Link href={`/profile/${item.freindId}`}>사진</Link>
        <p>{item.name}</p>
      </div>
      <div className={styles["friend-item__icons"]}>
        <Link href={`/friends/${item.relationId}`}>
          <Icon.Message size="xl" />
        </Link>
        <Link href={`/profile/${item.relationId}`}>
          <Icon.Music size="xl" />
        </Link>
      </div>
    </div>
  );
};

export default FriendItem;
