import { PlayList } from "@/types/playList";
import { atom } from "recoil";
import { v4 as uuidv4 } from "uuid";

export const myPlayListState = atom<PlayList>({
  key: `myPlayListState_${uuidv4()}`,
  default: undefined,
});
