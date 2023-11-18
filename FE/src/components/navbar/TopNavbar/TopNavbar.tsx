import { useRouter } from "next/router";
import React from "react";
import styles from "./TopNavbar.module.css";
import Icon from "@/components/icons";
import Link from "next/link";
import useFriendRequest from "@/hooks/useFriendRequest";
import Image from "next/image";
// import { usePathname } from "next/navigation";

// const pageTitleByPathname = (pathname: string) => {
//   switch (pathname) {
//     case "/friends/":
//       return "채팅";
//     case "/":
//       return "로그인";
//     case "/main":
//       return "메인 페이지";
//     case "/player":
//       return "플레이어";
//     case "/recommendation":
//       return "친구 추천";
//     case "/friends":
//       return "친구 목록";
//     case "/friends/requests":
//       return "친구 요청 목록";
//   }
// };

const TopNavbar = () => {
  const router = useRouter();
  const { unreadFriendRequestCount } = useFriendRequest();
  // const pathname = usePathname();

  return (
    <nav className={styles["top-navbar"]}>
      <div className={styles["top-navbar__item"]} onClick={router.back}>
        <Icon.Back />
      </div>
      <Image src="/TuneMate.png" alt="TuneMate Logo" width={130} height={20} />

      {/* <p>{pageTitleByPathname(pathname)}</p> */}

      <Link href={"/friends/requests"} className={styles["top-navbar__item"]}>
        {unreadFriendRequestCount > 0 && (
          <p className={styles["top-navbar__unread-count"]}>
            {unreadFriendRequestCount}
          </p>
        )}
        <Icon.Alarm />
      </Link>
    </nav>
  );
};

export default TopNavbar;
