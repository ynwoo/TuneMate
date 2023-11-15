import Props from "@/types";
import styles from "./Select.module.css";
import { classNameWrapper } from "@/utils/className";
import { ChangeEvent } from "react";
import Option, { OptionType } from "../Option/Option";

interface SelectProps extends Props {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  items: OptionType[];
}

const Select = ({ className, onChange, items }: SelectProps) => {
  return (
    <select
      className={classNameWrapper(styles["select"], className)}
      name=""
      id=""
      onChange={onChange}
    >
      {items.map(({ name, value }) => (
        <Option value={value} name={name} />
      ))}
    </select>
  );
};

export default Select;
