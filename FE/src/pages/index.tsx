import { storage } from "@/utils/storage";
import Link from "next/link";
import styles from "@/styles/LoginPage.module.css";

const LoginPage = () => {
  if (typeof window !== "undefined") {
    storage.setAccessToken(
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJjYjg5OWJjOC0zM2E5LTQzYTYtOTM4Yy03NmIwZWMyODZjNzciLCJleHAiOjE2OTkyNjQxMjMsImlzcyI6IlR1bmVtYXRlIn0.4ujNAr07ukx9YQRpQ52P273oHQ5xKBdkiNYAuROGXaQ3WkgjgJku_JMG3F81Amow"
    );
  }

  return (
    <div className={styles["login-page"]}>
      <p className={styles["login-page__title"]}>Tunemate</p>
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
