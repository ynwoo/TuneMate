import Link from "next/link";
import styles from "./BottomNavbar.module.css";

const BottomNavbar = () => {
  return (
    <div className={styles["bottom-navbar"]}>
      <Link href="/main" className={styles["bottom-navbar__item"]}>
        main
      </Link>
      <Link href="/profile/1" className={styles["bottom-navbar__item"]}>
        profile
      </Link>
      <Link href="/friends" className={styles["bottom-navbar__item"]}>
        friends
      </Link>
      <Link href="/recommendation" className={styles["bottom-navbar__item"]}>
        recommendation
      </Link>
    </div>
  );
};

export default BottomNavbar;
