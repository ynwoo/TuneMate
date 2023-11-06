import Props from "@/types";
import { classNameWrapper } from "@/utils/className";
import styles from "./Button.module.css";
import { MouseEvent, useCallback } from "react";
import Modal from "../modal/Modal";
import useModal from "@/hooks/useModal";

interface ButtonWithModalProps extends Props {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  modalMessage: string;
}

const ButtonWithModal = ({
  className,
  children,
  onClick,
  modalMessage,
}: ButtonWithModalProps) => {
  const { closeToggle, isOpen, openToggle } = useModal();

  const onModal = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      openToggle();
    },
    [openToggle]
  );

  const onConfirm = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      onClick(e);
      closeToggle();
    },
    [onClick, closeToggle]
  );

  return (
    <>
      <button
        className={classNameWrapper(className, styles.button)}
        onClick={onModal}
      >
        {children}
      </button>
      <Modal isOpen={isOpen} toggle={closeToggle}>
        <p>{modalMessage}</p>
        <button className={styles["button__accept"]} onClick={onConfirm}>
          확인
        </button>
        <button className={styles["button--reject"]} onClick={closeToggle}>
          취소
        </button>
      </Modal>
    </>
  );
};

export default ButtonWithModal;
