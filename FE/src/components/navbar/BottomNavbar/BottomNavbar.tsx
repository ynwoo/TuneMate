import Link from "next/link";
import styles from "./BottomNavbar.module.css";
import Icon from "@/components/icons";

const BottomNavbar = () => {
  return (
    <nav className={styles["bottom-navbar"]}>
      <Link href="/main" className={styles["bottom-navbar__item"]}>
        <Icon.Home />
      </Link>
      <Link href="/profile/1" className={styles["bottom-navbar__item"]}>
        <Icon.Profile />
      </Link>
      <Link href="/friends" className={styles["bottom-navbar__item"]}>
        <Icon.Friends />
      </Link>
      <Link href="/recommendation" className={styles["bottom-navbar__item"]}>
        <Icon.Recommendation />
      </Link>
    </nav>
  );
};

export default BottomNavbar;
