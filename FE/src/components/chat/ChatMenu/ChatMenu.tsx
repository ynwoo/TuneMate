import Props from "@/types";
import styles from "./ChatMenu.module.css";
import { classNameWrapper } from "@/utils/className";
import ChatMenuItem from "../ChatMenuItem/ChatMenuItem";
import Icon from "@/components/icons";
import Button from "@/components/button/Button";

interface ChatMenuProps extends Props {
  onDelete: () => void;
}

const ChatMenu = ({ className, onDelete }: ChatMenuProps) => {
  return (
    <div className={classNameWrapper(styles["chat-menu"], className)}>
      <ChatMenuItem title="사진 / 동영상"></ChatMenuItem>
      <ChatMenuItem title="공용 플레이 리스트"></ChatMenuItem>
      <Button
        className={styles["chat-menu__exit"]}
        color="white"
        onClick={onDelete}
      >
        <Icon.Exit />
      </Button>
    </div>
  );
};

export default ChatMenu;
