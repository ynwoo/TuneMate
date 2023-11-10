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
<<<<<<< HEAD
    const userId = "cb899bc8-33a9-43a6-938c-76b0ec286c77";
    const accessToken =
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJjYjg5OWJjOC0zM2E5LTQzYTYtOTM4Yy03NmIwZWMyODZjNzciLCJleHAiOjE2OTk1OTM5NDQsImlzcyI6IlR1bmVtYXRlIn0.AA0jrE-Fyy-9-1oL2-ahpTqASKeb0RKhYmTpgbkYba584z4RThCnh-RoRzG4sHQa";
    const refreshToken =
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJSZWZyZXNoIFRva2VuIiwidXNlcklkIjoiY2I4OTliYzgtMzNhOS00M2E2LTkzOGMtNzZiMGVjMjg2Yzc3IiwiZXhwIjoxNzAwNzk2MzQ0LCJpc3MiOiJUdW5lbWF0ZSJ9.AS2jKNlri5IPoa879eLePUIu07WvLVnz7Kmgh1SCLbW8qb0ttCj96KC7c_RGOfNj";
=======
    const userId = "23cb91d3-78ac-45b0-995a-38f8bd348dff";
    const accessToken =
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIyM2NiOTFkMy03OGFjLTQ1YjAtOTk1YS0zOGY4YmQzNDhkZmYiLCJleHAiOjE2OTk1MTQwNDcsImlzcyI6IlR1bmVtYXRlIn0.p9n_B4j0jmehzVOizEnr9i3amXmu94RlY0doR-4M8WWBFhNORcYBk4RxB5ucvZ-K";
    const refreshToken =
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJSZWZyZXNoIFRva2VuIiwidXNlcklkIjoiMjNjYjkxZDMtNzhhYy00NWIwLTk5NWEtMzhmOGJkMzQ4ZGZmIiwiZXhwIjoxNzAwNzE2NDQ3LCJpc3MiOiJUdW5lbWF0ZSJ9.VyqWOe9NUcl7gS2B2wFVburpaLuZNJ4XRakuYmpEnp3Ta0Dj0RCy3eS5yvmQP3XT";
>>>>>>> 365012b68d45b4cfe8808451c621ddf6a3056762
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
