import Props from "@/types";
import styles from "./MainContent.module.css";
import { classNameWrapper } from "@/utils/className";

interface MainContentProps extends Props {
  title: string | JSX.Element;
  onClick: () => void;
}

const MainContent = ({
  children,
  title,
  onClick,
  className,
}: MainContentProps) => {
  return (
    <div className={classNameWrapper(styles["main-content"], className)}>
      <div className={styles["main-content__header"]}>
        <h1 className={styles["main-content__title"]}>{title}</h1>
        <p className={styles["main-content__button"]} onClick={onClick}>
          더보기
        </p>
      </div>
      {children}
    </div>
  );
};

export default MainContent;
