import { PlayList } from "@/types/playList";
import { atom } from "recoil";

export const myPlayListState = atom<PlayList>({
  key: "myPlayListState",
  default: undefined,
});
