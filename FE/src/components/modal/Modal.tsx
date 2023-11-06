import { classNameWrapper } from "@/utils/className";
import styles from "./Modal.module.css";
import Props from "@/types";

interface ModalProps extends Props {
  isOpen: boolean;
  toggle: () => void;
  children: JSX.Element | JSX.Element[];
}

const Modal = ({
  className,
  toggle,
  isOpen,
  children,
}: ModalProps): JSX.Element => {
  return (
    <>
      {isOpen && (
        <div
          //   style={{ top: scrollTop }}
          className={classNameWrapper(className, styles["modal-overlay"])}
          onClick={(e) => {
            e.stopPropagation();
            toggle();
          }}
        >
          <div
            className={styles["modal-box"]}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
