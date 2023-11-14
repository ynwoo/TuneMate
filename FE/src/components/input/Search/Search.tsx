import Icon from "@/components/icons";
import { classNameWrapper } from "@/utils/className";
import styles from "./Search.module.css";
import Props from "@/types";
import { ChangeEvent, KeyboardEvent } from "react";

interface SearchProps extends Props {
  value: string;
  onInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const Search = ({ className, onInput, onSubmit, value }: SearchProps) => {
  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className={classNameWrapper(styles.search, className)}>
      <input
        autoFocus
        className={styles["search__input"]}
        type="search"
        onChange={onInput}
        onKeyDown={onEnter}
        value={value}
      />
      <div className={styles["search__icon-container"]} onClick={onSubmit}>
        <Icon.Send className={styles["search__icon"]} />
      </div>
    </div>
  );
};

export default Search;
