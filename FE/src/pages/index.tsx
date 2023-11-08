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
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJjYjg5OWJjOC0zM2E5LTQzYTYtOTM4Yy03NmIwZWMyODZjNzciLCJleHAiOjE2OTk0MDY5NzEsImlzcyI6IlR1bmVtYXRlIn0.c_3p55ptALHixny44vYEoqB-NGOVq-3oRlPRro1yffZLIspjccX2eNZHuKMcJOxw";
    const refreshToken =
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJSZWZyZXNoIFRva2VuIiwidXNlcklkIjoiY2I4OTliYzgtMzNhOS00M2E2LTkzOGMtNzZiMGVjMjg2Yzc3IiwiZXhwIjoxNzAwNjA5MzcxLCJpc3MiOiJUdW5lbWF0ZSJ9.HJLcYq1Vy7r9OShDqoKCjMuCFVYxpFEI-e9ZsVW2Io-6kshv_B0gA3abc1gzEk_C";
    Cookie.setTokenResponse({ userId, accessToken, refreshToken });
    location.reload();
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
