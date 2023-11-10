// atom.js 또는 유사한 파일
import { Track } from "@/types/spotify";
import { atom } from "recoil";

export const playlistState = atom<string[]>({
  key: "playlistState",
  default: [] as string[], // 사용 사례에 따라 적절한 기본값 설정
});

export const MainplaylistState = atom<string[]>({
  key: "MainplaylistState",
  default: [] as string[], // 사용 사례에 따라 적절한 기본값 설정
});

export const PickTrackState = atom<Track>({
  key: "PickTrackState",
  default: undefined,
});

export const PickTrackUriState = atom<Track>({
  key: "PickTrackUriState",

  default: undefined,
});

export const ListInfoState = atom<Track>({
  key: "ListInfoState",
  default: undefined, // 사용 사례에 따라 적절한 기본값 설정
});

export const currentTrackIndexState = atom<Track>({
  key: "currentTrackIndexState",
  default: undefined,
});
