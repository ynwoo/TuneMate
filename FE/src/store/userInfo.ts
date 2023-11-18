import { UserInfo } from "@/types/user";
import { atom } from "recoil";
import { v4 as uuidv4 } from "uuid";

export const userInfoState = atom<UserInfo>({
  key: `userInfoState_${uuidv4()}`,
  default: undefined,
});
