import Props from "@/types";
import styles from "./ChatMenuItem.module.css";
import { classNameWrapper } from "@/utils/className";

interface ChatMenuItemProps extends Props {
  title: string;
}

const ChatMenuItem = ({ className, title, children }: ChatMenuItemProps) => {
  return (
    <div className={classNameWrapper(styles["chat-menu-item"], className)}>
      <div className={styles["chat-menu-item__title"]}>{title}</div>
      <div className={styles["chat-menu-item__content"]}>{children}</div>
    </div>
  );
};

export default ChatMenuItem;
