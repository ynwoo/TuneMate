import { classNameWrapper } from "@/utils/className";
import styles from "./Modal.module.css";
import Props from "@/types";

interface SimpleModalProps extends Props {
  isOpen: boolean;
  toggle: () => void;
  children: JSX.Element | JSX.Element[];
}

const SimpleModal = ({
  className,
  toggle,
  isOpen,
  children,
}: SimpleModalProps): JSX.Element => {
  return (
    <>
      {isOpen && (
        <div
          className={classNameWrapper(className, styles["modal-overlay"])}
          onClick={(e) => {
            e.stopPropagation();
            toggle();
          }}
        >
          <div
            className={styles["modal-simple"]}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default SimpleModal;
