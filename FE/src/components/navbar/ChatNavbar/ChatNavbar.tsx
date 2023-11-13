import Icon from "@/components/icons";
import styles from "./ChatNavbar.module.css";
import { useRouter } from "next/router";
import Props from "@/types";
import { classNameWrapper } from "@/utils/className";

interface ChatNavbarProps extends Props {
  onModal: () => void;
}

const ChatNavbar = ({ className, onModal }: ChatNavbarProps) => {
  const router = useRouter();
  return (
    <ul className={classNameWrapper(styles["chat-navbar"], className)}>
      <li className={styles["chat-navbar__item"]} onClick={router.back}>
        <Icon.Back />
      </li>
      <li className={styles["chat-navbar__item"]} onClick={onModal}>
        <Icon.Menu />
      </li>
    </ul>
  );
};

export default ChatNavbar;
