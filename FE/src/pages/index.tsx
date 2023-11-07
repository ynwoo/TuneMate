import { storage } from "@/utils/storage";
import Link from "next/link";
import styles from "@/styles/LoginPage.module.css";
import Image from "next/image";
import { TUNEMATE_API_BASE_URL } from "@/constants/url";

const LoginPage = () => {
  if (typeof window !== "undefined") {
    storage.setAccessToken(
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJjYjg5OWJjOC0zM2E5LTQzYTYtOTM4Yy03NmIwZWMyODZjNzciLCJleHAiOjE2OTkzMzU5ODEsImlzcyI6IlR1bmVtYXRlIn0.5EeZufJeflqx9J_Vf5xfLrLKvOKjpcaX_tEPMQUI_SnhYv_FTAxiENBC8SLcrDOn"
    );
  }

  return (
    <div className={styles["login-page"]}>
      <Image src="/TuneMate.png" alt="TuneMate Logo" width={250} height={40} />

      <p className={styles["login-page__title"]}></p>
      <br />
      <a
        href={`${TUNEMATE_API_BASE_URL}/user-service/oauth2/authorization/spotify`}
      >
        login
      </a>
      <br />
      <Link href={"/main"}>메인 페이지 이동</Link>
    </div>
  );
};

export default LoginPage;
