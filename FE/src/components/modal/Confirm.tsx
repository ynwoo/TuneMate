import styles from "@/components/button/Button.module.css";
import Button from "../button/Button";
import { classNameWrapper } from "@/utils/className";
import { MouseEvent, useCallback } from "react";
import Props from "@/types";
import Modal from "./Modal";

interface ConfirmProps extends Props {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  modalMessage: string;
  closeToggle: () => void;
  isOpen: boolean;
}

const Confirm = ({ onClick, modalMessage, closeToggle, isOpen }: ConfirmProps) => {
  const onConfirm = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      onClick(e);
      closeToggle();
    },
    [onClick, closeToggle]
  );
  return (
    <Modal className={styles["button-with-modal"]} isOpen={isOpen} toggle={closeToggle}>
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
  );
};

export default Confirm;
