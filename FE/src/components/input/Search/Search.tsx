import Icon from "@/components/icons";
import { classNameWrapper } from "@/utils/className";
import styles from "./Search.module.css";
import Props from "@/types";
import { ChangeEvent } from "react";

interface SearchProps extends Props {
  value: string;
  onInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const Search = ({ className, onInput, onSubmit, value }: SearchProps) => {
  return (
    <div className={classNameWrapper(styles.search, className)}>
      <input
        className={styles["search__input"]}
        type="search"
        onChange={onInput}
        value={value}
      />
      <div className={styles["search__icon-container"]} onClick={onSubmit}>
        <Icon.Send className={styles["search__icon"]} />
      </div>
    </div>
  );
};

export default Search;
