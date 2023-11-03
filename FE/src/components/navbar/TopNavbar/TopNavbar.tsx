import { useRouter } from "next/router";
import styles from "./TopNavbar.module.css";

const TopNavbar = () => {
  const router = useRouter();
  return (
    <div className={styles["top-navbar"]}>
      <div className={styles["top-navbar__item"]} onClick={router.back}>
        뒤로가기
      </div>
      <div className={styles["top-navbar__item"]}>알림</div>
    </div>
  );
};

export default TopNavbar;
