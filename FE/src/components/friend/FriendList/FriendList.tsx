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
    <div className={styles["friend-list"]}>
      {friends.map((friend) => (
        <FriendItem key={friend.freindId} item={friend} />
      ))}
    </div>
  );
};

export default FriendList;
