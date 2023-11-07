import { useRouter } from "next/router";
import React from "react";
import styles from "./TopNavbar.module.css";
import Icon from "@/components/icons";
import Link from "next/link";
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
  // const pathname = usePathname();

  return (
    <div className={styles["top-navbar"]}>
      <div className={styles["top-navbar__item"]} onClick={router.back}>
        <Icon.Back />
        {/* <p>{pageTitleByPathname(pathname)}</p> */}
      </div>

      <Link href={"/friends/requests"} className={styles["top-navbar__item"]}>
        <Icon.Alarm />
      </Link>
    </div>
  );
};

export default TopNavbar;
