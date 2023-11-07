import { storage } from "@/utils/storage";
import Link from "next/link";
import styles from "@/styles/LoginPage.module.css";

const LoginPage = () => {
  if (typeof window !== "undefined") {
    storage.setAccessToken(
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJjYjg5OWJjOC0zM2E5LTQzYTYtOTM4Yy03NmIwZWMyODZjNzciLCJleHAiOjE2OTkyNDk4MzksImlzcyI6IlR1bmVtYXRlIn0.y6V7byvSHtGeo9NZDScb8aMKaTPk9Jx2TWQCBDYt5cFY32MASbOJxSuzE7UO55F2"
    );
  }

  return (
    <div className={styles["login-page"]}>
      <p className={styles["login-page__title"]}>Tunemate</p>
      <br />
      <a href="http://tunemate.co.kr/api/v1/user-service/oauth2/authorization/spotify">
        login
      </a>
      <br />
      <Link href={"/main"}>메인 페이지 이동</Link>
    </div>
  );
};

export default LoginPage;
