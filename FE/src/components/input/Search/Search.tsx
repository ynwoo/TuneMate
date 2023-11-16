import Icon from "@/components/icons";
import { classNameWrapper } from "@/utils/className";
import styles from "./Search.module.css";
import Props from "@/types";
import { ChangeEvent, KeyboardEvent, useMemo, RefObject } from "react";

type SearchType = "chat" | "default" | "none";

interface SearchProps extends Props {
  value: string;
  onInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  searchRef?: RefObject<HTMLInputElement>;
  type?: SearchType;
}

const Search = ({
  className,
  onInput,
  onSubmit,
  value,
  type = "default",
  searchRef,
}: SearchProps) => {
  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  const sendIcon = useMemo(() => {
    switch (type) {
      case "chat":
        return (
          <div className={styles["search__icon-container"]} onClick={onSubmit}>
            <Icon.Send className={styles["search__icon"]} />
          </div>
        );
      case "none":
        return <></>;
      case "default":
        return (
          <div className={styles["search__icon-container"]} onClick={onSubmit}>
            <Icon.Search className={styles["search__icon"]} />
          </div>
        );
    }
  }, []);

  return (
    <div className={classNameWrapper(styles.search, className)}>
      <input
        autoFocus
        ref={searchRef}
        className={styles["search__input"]}
        type="search"
        onChange={onInput}
        onKeyDown={onEnter}
        value={value}
      />
      {sendIcon}
    </div>
  );
};

export default Search;
