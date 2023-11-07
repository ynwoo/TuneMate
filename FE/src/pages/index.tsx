import { storage } from "@/utils/storage";
import Link from "next/link";
import styles from "@/styles/LoginPage.module.css";
import Image from "next/image";
import { TUNEMATE_API_BASE_URL } from "@/constants/url";
import { Cookie } from "@/utils/cookie";
import { TokenResponse } from "@/types/user";
import { useRouter } from "next/router";
import { getUserInfo } from "@/api/user";
import { useEffect } from "react";

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    storage.clear();
    const tokenResponse: TokenResponse = Cookie.getTokenResponse();
    storage.setTokenResponse(tokenResponse);
  }, []);

  useEffect(() => {
    const userId = storage.getUserId();
    if (userId) {
      getUserInfo(userId).then(() => {
        router.push("/main");
      });
    }
  }, [router]);

  const setCookie = () => {
    const userId = "cb899bc8-33a9-43a6-938c-76b0ec286c77";
    const accessToken =
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJjYjg5OWJjOC0zM2E5LTQzYTYtOTM4Yy03NmIwZWMyODZjNzciLCJleHAiOjE2OTkzNDg2MTMsImlzcyI6IlR1bmVtYXRlIn0.xcjOIuf81s4YWwKt2zzx1ezw0YHqD1N_TDOsvUSssgsblcSNgWO_3r684HN-aot2";
    const refreshToken =
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJSZWZyZXNoIFRva2VuIiwidXNlcklkIjoiY2I4OTliYzgtMzNhOS00M2E2LTkzOGMtNzZiMGVjMjg2Yzc3IiwiZXhwIjoxNzAwNTUxMDEzLCJpc3MiOiJUdW5lbWF0ZSJ9.t_oHXj4FrUYZDbOyMyDWNHEYk2CqTOX8Gsjh-h5ZcGENm8izlB_2Of2y3GWYu3Sg";
    Cookie.setTokenResponse({ userId, accessToken, refreshToken });
  };

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
      <br />
      <button onClick={setCookie}>쿠키 넣기!!!!!</button>
    </div>
  );
};

export default LoginPage;
