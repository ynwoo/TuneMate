import React from "react";
import Props from "@/types";
import { Friend } from "@/types/social";
import styles from "./FriendList.module.css";
import FriendItem from "../FriendItem/FriendItem";
import { classNameWrapper } from "@/utils/className";

interface FriendListProps extends Props {
  friends: Friend[];
}

const FriendList = ({ friends, className }: FriendListProps) => {
  return (
    <ul className={classNameWrapper(styles["friend-list"], className)}>
      {friends.map((friend) => (
        <FriendItem key={friend.friendId} item={friend} className={styles["friend-list__item"]} />
      ))}
    </ul>
  );
};

export default FriendList;
