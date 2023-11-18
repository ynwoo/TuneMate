import Props from "@/types";
import { classNameWrapper } from "@/utils/className";
import styles from "./Button.module.css";
import { MouseEvent, useCallback } from "react";
import Modal from "../modal/Modal";
import useModal from "@/hooks/useModal";
import Button, { ButtonColor } from "./Button";

interface ButtonWithModalProps extends Props {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  modalMessage: string;
  color: ButtonColor;
}

const ButtonWithModal = ({
  className,
  children,
  onClick,
  modalMessage,
  color,
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
      <Button
        className={classNameWrapper(className, styles.button)}
        onClick={onModal}
        color={color}
      >
        {children}
      </Button>
      <Modal
        className={styles["button-with-modal__modal-container"]}
        isOpen={isOpen}
        toggle={closeToggle}
      >
        <div className={styles["button-with-modal__modal"]}>
          <p className={styles["button-with-modal__modal--text"]}>{modalMessage}</p>
          <div className={styles["button-with-modal__modal--button-container"]}>
            <Button
              className={classNameWrapper(styles["button-with-modal__modal--button"])}
              onClick={onConfirm}
              color="blue"
            >
              확인
            </Button>
            <Button
              className={classNameWrapper(styles["button-with-modal__modal--button"])}
              onClick={closeToggle}
              color="red"
            >
              취소
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ButtonWithModal;
