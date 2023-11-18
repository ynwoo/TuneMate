import { getUserInfo } from "@/api/user";
import { userInfoState } from "@/store/userInfo";
import { UserInfo } from "@/types/user";
import { Storage } from "@/utils/storage";
import { MINUTE } from "@/utils/time";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

// userInfo
const useUserInfo = () => {
  const [userInfo, setUserInfo] = useRecoilState<UserInfo>(userInfoState);

  useEffect(() => {
    const timer = setInterval(() => {
      getUserInfo(Storage.getUserId()).then((userInfo) => setUserInfo(userInfo));
    }, MINUTE * 3);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!userInfo) {
      getUserInfo(Storage.getUserId()).then((userInfo) => setUserInfo(userInfo));
    }
  }, [userInfo]);

  return userInfo;
};

export default useUserInfo;
