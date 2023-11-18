import Link from "next/link";
import React from "react";
import styles from "./BottomNavbar.module.css";
import Icon from "@/components/icons";
import Player from "@/components/player/Player/Player";
import Props from "@/types";
import { classNameWrapper } from "@/utils/className";
import useUserInfo from "@/hooks/useUserInfo";

const BottomNavbar = ({ className }: Props) => {
  const userInfo = useUserInfo();

  return (
    <div className={classNameWrapper(styles["bottom-navbar"], className)}>
      <Player />
      <nav className={styles["bottom-navbar__nav-item-container"]}>
        <Link href="/main" className={styles["bottom-navbar__nav-item"]}>
          <Icon.Home />
        </Link>
        <Link href={`/profile/${userInfo?.userId}`} className={styles["bottom-navbar__nav-item"]}>
          <Icon.Profile />
        </Link>
        <Link href="/friends" className={styles["bottom-navbar__nav-item"]}>
          <Icon.Friends />
        </Link>
        <Link href="/recommendation/friends" className={styles["bottom-navbar__nav-item"]}>
          <Icon.Recommendation />
        </Link>
        <Link href="/groups" className={styles["bottom-navbar__nav-item"]}>
          <Icon.Group />
        </Link>
      </nav>
    </div>
  );
};

export default BottomNavbar;
