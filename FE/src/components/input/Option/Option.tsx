import Props from "@/types";
import styles from "./Option.module.css";
import { classNameWrapper } from "@/utils/className";

export type OptionType = {
  name: string;
  value: string | number;
};

interface OptionProps extends Props {
  name: string;
  value: string | number;
}

const Option = ({ className, name, value }: OptionProps) => {
  return (
    <option
      className={classNameWrapper(styles["option"], className)}
      value={value}
    >
      {name}
    </option>
  );
};

export default Option;
