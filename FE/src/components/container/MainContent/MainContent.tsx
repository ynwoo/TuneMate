import Props from "@/types";
import styles from "./MainContent.module.css";

interface MainContentProps extends Props {
  title: string;
  onClick: () => void;
}

const MainContent = ({ children, title, onClick }: MainContentProps) => {
  return (
    <div className={styles["main-content"]}>
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
