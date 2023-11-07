import Props from "@/types";
import { classNameWrapper } from "@/utils/className";
import styles from "./Button.module.css";
import { MouseEvent } from "react";

export type ButtonColor = "red" | "blue";

interface ButtonProps extends Props {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  color: ButtonColor;
}

const Button = ({ className, children, onClick, color }: ButtonProps) => {
  return (
    <>
      <button
        className={classNameWrapper(className, styles.button, styles[color])}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
