import Props from "@/types";
import { classNameWrapper } from "@/utils/className";
import styles from "./Button.module.css";
import { MouseEvent } from "react";

interface ButtonProps extends Props {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ className, children, onClick }: ButtonProps) => {
  return (
    <>
      <button
        className={classNameWrapper(className, styles.button)}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
