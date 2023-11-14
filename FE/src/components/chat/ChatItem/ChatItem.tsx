import Props from "@/types";
import styles from "./ChatItem.module.css";
import { classNameWrapper } from "@/utils/className";
import { MessageResponse } from "@/types/chat";
import { Storage } from "@/utils/storage";
import { useMemo } from "react";
import ProfileImage from "@/components/image/ProfileImage/ProfileImage";
import { Time } from "@/utils/time";
import { useParams } from "next/navigation";
import useSocialFriendQuery from "@/hooks/queries/social/useSocialFriendQuery";

interface ChatItemProps extends Props {
  item: MessageResponse;
}

const ChatItem = ({ className, item }: ChatItemProps) => {
  const isMyChat = useMemo(
    () => Storage.getUserId() === item.senderNo,
    [item.senderNo]
  );

  const params = useParams();
  const friendId = params?.friendId as string;
  const { data: friend } = useSocialFriendQuery(friendId);

  const src = useMemo(() => {
    const src = isMyChat ? Storage.getImageUrl() : friend?.img;
    return src ?? "/favicon.ico";
  }, []);

  return (
    <li
      className={classNameWrapper(
        styles["chat-item"],
        !isMyChat && styles["reverse"],
        className
      )}
    >
      <p className={styles["chat-item__image"]}>
        <ProfileImage
          className={styles["friend-item__user--image"]}
          src={src}
          alt="친구 프로필"
          type="friend"
        />
      </p>
      <div className={styles["chat-item__content"]}>
        <p className={styles["chat-item__content--name"]}>{item.senderName}</p>
        <div
          className={classNameWrapper(
            styles["chat-item__content-container"],
            !isMyChat && styles["reverse"]
          )}
        >
          <p className={styles["chat-item__content--text"]}>{item.content}</p>
          <div className={styles["chat-item__content--info-container"]}>
            {Number(item.readCount) !== 0 && (
              <p className={styles["chat-item__content--info"]}>
                {item.readCount}
              </p>
            )}
            <p className={styles["chat-item__content--time"]}>
              {Time.hourAndMinute(item.time)}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ChatItem;
