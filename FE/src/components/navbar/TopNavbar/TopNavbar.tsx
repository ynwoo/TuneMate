import { useRouter } from "next/router";
import React from "react";
import styles from "./TopNavbar.module.css";
import Icon from "@/components/icons";

const TopNavbar = () => {
  const router = useRouter();
  return (
    <div className={styles["top-navbar"]}>
      <div className={styles["top-navbar__item"]} onClick={router.back}>
        <Icon.Back />
      </div>

      <div className={styles["top-navbar__item"]}>
        <Icon.Alarm />
      </div>
    </div>
  );
};

export default TopNavbar;
