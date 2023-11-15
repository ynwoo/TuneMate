import Props from "@/types";
import { ChangeEvent, RefObject } from "react";
import styles from "./TextArea.module.css";
import { classNameWrapper } from "@/utils/className";

interface TextAreaProps extends Props {
  autoFocus?: boolean;
  value: string;
  inputRef?: RefObject<HTMLTextAreaElement>;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  name: string;
  label: string;
}

const TextArea = ({
  autoFocus,
  value,
  inputRef,
  onChange,
  name,
  className,
  label,
}: TextAreaProps) => {
  return (
    <div className={classNameWrapper(styles["textarea-container"], className)}>
      <label className={styles["textarea-label"]} htmlFor={name}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        className={styles["textarea"]}
        autoFocus={autoFocus}
        ref={inputRef}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default TextArea;
