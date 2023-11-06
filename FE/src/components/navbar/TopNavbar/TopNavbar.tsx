import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./TopNavbar.module.css";
import Icon from "@/components/icons";
import Modal from "@/components/modal/Modal";
import useModal from "@/hooks/useModal";

const TopNavbar = () => {
  const router = useRouter();
  const { isOpen, closeToggle, openToggle } = useModal();

  return (
    <div className={styles["top-navbar"]}>
      <div className={styles["top-navbar__item"]} onClick={router.back}>
        <Icon.Back />
      </div>

      <div className={styles["top-navbar__item"]} onClick={openToggle}>
        <Icon.Alarm />
      </div>

      <Modal isOpen={isOpen} toggle={closeToggle}>
        <div>modal</div>
      </Modal>
    </div>
  );
};

export default TopNavbar;
