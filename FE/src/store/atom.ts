// atom.js 또는 유사한 파일
import { Track } from "@/types/spotify";
import { atom } from "recoil";

export const playlistState = atom<string[]>({
  key: "playlistState",
  default: [] as string[], // 사용 사례에 따라 적절한 기본값 설정
});

export const PickTrackState = atom<Track>({
  key: "PickTrackState",
  // default: ["spotify:track:5ZkITfPpcNPnyYGTibkO6m"],
  // default: [] as string[], // 사용 사례에 따라 적절한 기본값 설정
  default: undefined,
});

export const ListInfoState = atom<Track>({
  key: "ListInfoState",
  default: undefined, // 사용 사례에 따라 적절한 기본값 설정
});
