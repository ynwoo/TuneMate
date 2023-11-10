import React from "react";
import Props from "@/types";
import { Friend } from "@/types/social";
import styles from "./FriendList.module.css";
import FriendItem from "../FriendItem/FriendItem";

interface FriendListProps extends Props {
  friends: Friend[];
}

const FriendList = ({ friends }: FriendListProps) => {
  return (
    <ul className={styles["friend-list"]}>
      {friends.map((friend) => (
        <FriendItem
          key={friend.friendId}
          item={friend}
          className={styles["friend-list__item"]}
        />
      ))}
    </ul>
  );
};

export default FriendList;
