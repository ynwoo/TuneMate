import { UserInfo } from "@/types/user";
import { atom } from "recoil";

const userInfoState = atom<UserInfo>({
  key: "userInfoState",
  default: undefined,
});

export { userInfoState };
