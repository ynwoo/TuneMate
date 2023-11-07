import { storage } from "@/utils/storage";
import Link from "next/link";
import styles from "@/styles/LoginPage.module.css";
import Image from "next/image";

const LoginPage = () => {
  if (typeof window !== "undefined") {
    storage.setAccessToken(
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJjYjg5OWJjOC0zM2E5LTQzYTYtOTM4Yy03NmIwZWMyODZjNzciLCJleHAiOjE2OTkzMjIwNTUsImlzcyI6IlR1bmVtYXRlIn0.XgU3ekmW15b-3JFtAbcEM87JWJPrYI6vO0yn-BbyDfDqb65Cw4zlY63H6K7X1OzO"
    );
  }

  return (
    <div className={styles["login-page"]}>
      <Image src="/TuneMate.png" alt="TuneMate Logo" width={250} height={40} />

      <p className={styles["login-page__title"]}></p>
      <br />
      <a href="http://k9a603.p.ssafy.io:8000/api/v1/user-service/oauth2/authorization/spotify">
        login
      </a>
      <br />
      <Link href={"/main"}>메인 페이지 이동</Link>
    </div>
  );
};

export default LoginPage;
