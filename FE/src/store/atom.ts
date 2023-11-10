// atom.js 또는 유사한 파일
import { atom } from "recoil";

export const playlistState = atom<string[]>({
  key: "playlistState",
  default: [] as string[], // 사용 사례에 따라 적절한 기본값 설정
});

export const PickTrack = atom<string[]>({
  key: "PickTrack",
  default: [] as string[], // 사용 사례에 따라 적절한 기본값 설정
});
