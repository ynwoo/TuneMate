import Props from "@/types";
import { classNameWrapper } from "@/utils/className";
import styles from "./Button.module.css";
import { MouseEvent } from "react";

export type ButtonColor = "red" | "blue" | "white" | "none";

interface ButtonProps extends Props {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  color: ButtonColor;
}

const Button = ({ className, children, onClick, color }: ButtonProps) => {
  return (
    <>
      <button
        className={classNameWrapper(styles.button, styles[color], className)}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
