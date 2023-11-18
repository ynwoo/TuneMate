import Icon from "@/components/icons";
import styles from "./ChatNavbar.module.css";
import { useRouter } from "next/router";
import Props from "@/types";
import { classNameWrapper } from "@/utils/className";
import Image from "next/image";

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
      <Image src="/TuneMate.png" alt="TuneMate Logo" width={130} height={21} />
      <li className={styles["chat-navbar__item"]} onClick={onModal}>
        <Icon.Menu />
      </li>
    </ul>
  );
};

export default ChatNavbar;
