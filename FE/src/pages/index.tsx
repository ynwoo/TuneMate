import { Storage } from "@/utils/storage";
import Link from "next/link";
import styles from "@/styles/LoginPage.module.css";
import b_styles from "@/components/button/Button.module.css";
import Image from "next/image";
import { TUNEMATE_API_BASE_URL } from "@/constants/url";
import { Cookie } from "@/utils/cookie";
import { TokenResponse } from "@/types/user";
import { useRouter } from "next/router";
import { getUserInfo } from "@/api/user";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userInfoState } from "@/store/userInfo";
import PWAButton from "@/components/button/PWAButton";
import { classNameWrapper } from "@/utils/className";
import Button from "@/components/button/Button";

const LoginPage = () => {
  const router = useRouter();
  const setUserInfo = useSetRecoilState(userInfoState);

  useEffect(() => {
    Storage.clear();
    const tokenResponse: TokenResponse = Cookie.getTokenResponse();
    Storage.setTokenResponse(tokenResponse);
    const userId = Storage.getUserId();
    if (userId) {
      getUserInfo(userId).then((data) => {
        setUserInfo(data);
        router.push("/main");
      });
    }
  }, [router, setUserInfo]);

  const setCookie = () => {
    const userId = "ab1b4b7f-abb2-4bf1-920f-b437233b4f47";
    const accessToken =
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhYjFiNGI3Zi1hYmIyLTRiZjEtOTIwZi1iNDM3MjMzYjRmNDciLCJleHAiOjE3MDAwNDQxNTEsImlzcyI6IlR1bmVtYXRlIn0.xWR97MB7Fb_bWol_z9qjldlMs0lfU5HOX7mzTeTRqd2bqWLvfEt_pSJeWyio47aa";
    const refreshToken =
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJSZWZyZXNoIFRva2VuIiwidXNlcklkIjoiYWIxYjRiN2YtYWJiMi00YmYxLTkyMGYtYjQzNzIzM2I0ZjQ3IiwiZXhwIjoxNzAxMjQ2NTUxLCJpc3MiOiJUdW5lbWF0ZSJ9.w-Ff-hFba5krYgtPqtiNTY_4lwSLPcmst611VuvJh4r7jc_OcVIJPZ0Z9QtbeUfP";
    Cookie.setTokenResponse({ userId, accessToken, refreshToken });
    location.reload();
  };

  return (
    <div className={styles["login-page"]}>
      <div className={styles["login-page__title"]}>
        <Image
          src="/TuneMate.png"
          alt="TuneMate Logo"
          width={250}
          height={40}
        />
      </div>
      <div className={styles["login-page__button"]}>
        <a
          className={classNameWrapper(b_styles["button"], b_styles["blue"])}
          href={`${TUNEMATE_API_BASE_URL}/user-service/oauth2/authorization/spotify`}
        >
          로그인
        </a>
      </div>
      <div className={styles["login-page__button"]}>
        <PWAButton />
      </div>
      {process.env.NODE_ENV === "development" && (
        <>
          <Button
            className={styles["login-page__button"]}
            onClick={setCookie}
            color="white"
          >
            쿠키 넣기!!!!!
          </Button>
          <Link href={"/main"}>메인 페이지 이동</Link>
        </>
      )}
    </div>
  );
};

export default LoginPage;
