import { Storage } from "@/utils/storage";
import Link from "next/link";
import styles from "@/styles/LoginPage.module.css";
import Image from "next/image";
import { TUNEMATE_API_BASE_URL } from "@/constants/url";
import { Cookie } from "@/utils/cookie";
import { TokenResponse } from "@/types/user";
import { useRouter } from "next/router";
import { getUserInfo } from "@/api/user";
import { useEffect } from "react";
import useChat from "@/hooks/useChat";
import { useSetRecoilState } from "recoil";
import { userInfoState } from "@/store/userInfo";

const LoginPage = () => {
  const router = useRouter();
  const { connect } = useChat();
  const setUserInfo = useSetRecoilState(userInfoState);

  useEffect(() => {
    Storage.clear();
    const tokenResponse: TokenResponse = Cookie.getTokenResponse();
    Storage.setTokenResponse(tokenResponse);
    const userId = Storage.getUserId();
    if (userId) {
      getUserInfo(userId).then((data) => {
        connect();
        setUserInfo(data);
        router.push("/main");
      });
    }
  }, [router, connect, setUserInfo]);

  const setCookie = () => {
    const userId = "cb899bc8-33a9-43a6-938c-76b0ec286c77";
    const accessToken =
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJjYjg5OWJjOC0zM2E5LTQzYTYtOTM4Yy03NmIwZWMyODZjNzciLCJleHAiOjE2OTk1MTQ2NTEsImlzcyI6IlR1bmVtYXRlIn0.j92aCHLpYBebWG6mqSB8wD1h0mWXcji8mwFfjrtTgbDO6biXafjWTNJn-0sHsl_f";
    const refreshToken =
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJSZWZyZXNoIFRva2VuIiwidXNlcklkIjoiY2I4OTliYzgtMzNhOS00M2E2LTkzOGMtNzZiMGVjMjg2Yzc3IiwiZXhwIjoxNzAwNzE3MDUxLCJpc3MiOiJUdW5lbWF0ZSJ9.E8NThDhYq2-IndhGbN9PEQwQC1DORYezo9WxU_lhTkLdeg5B3LObyIdHc3N2WAKR";
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
