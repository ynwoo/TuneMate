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
    const userId = "ab1b4b7f-abb2-4bf1-920f-b437233b4f47";
    const accessToken =
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhYjFiNGI3Zi1hYmIyLTRiZjEtOTIwZi1iNDM3MjMzYjRmNDciLCJleHAiOjE2OTk0MTAxODUsImlzcyI6IlR1bmVtYXRlIn0.jeKqm0DMmCtGDc2n9DpBh9hbRauhG-1uPUXh611p0fJfGfocqaiuzjG8FZR1A3Cp";
    const refreshToken =
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJSZWZyZXNoIFRva2VuIiwidXNlcklkIjoiYWIxYjRiN2YtYWJiMi00YmYxLTkyMGYtYjQzNzIzM2I0ZjQ3IiwiZXhwIjoxNzAwNjEyNTg1LCJpc3MiOiJUdW5lbWF0ZSJ9.1MCpWSvgkqJiYODEkMOjZwAS9aAU9mPvVWr0iJrG5l8eN0IVyEkfzevaFIV1sSHZ";
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
