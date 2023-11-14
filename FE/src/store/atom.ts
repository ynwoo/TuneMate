// atom.js 또는 유사한 파일
import { Track } from "@/types/spotify";
import { atom } from "recoil";

export const playlistState = atom<string[]>({
  key: "playlistState",
  default: [] as string[], // 사용 사례에 따라 적절한 기본값 설정
});

// 플레이 리스트 uri 만 있음
export const MainplaylistState = atom<string[]>({
  key: "MainplaylistState",
  default: [] as string[], // 사용 사례에 따라 적절한 기본값 설정
});

export const PickTrackState = atom<Track>({
  key: "PickTrackState",
  default: undefined,
});

// 리스트에서 선택한 곡의 uri
export const PickTrackUriState = atom<Track>({
  key: "PickTrackUriState",

  default: undefined,
});

// 리스트 첫곡의 정보 / 앨범 아트 uri 다들어있음
export const ListInfoState = atom<Track>({
  key: "ListInfoState",
  default: undefined, // 사용 사례에 따라 적절한 기본값 설정
});

export const currentTrackIndexState = atom<Track>({
  key: "currentTrackIndexState",
  default: undefined,
});

// 현재 플레이 중인 앨범 아트 이미지 주소
export const AlubumArtState = atom<string>({
  key: "AlubumArtState",
  default: undefined,
});

export const reSongUrlState = atom<string>({
  key: "reSongUrlState",
  default: undefined,
});

export const reAlbumArtState = atom<string>({
  key: "reAlbumArtState",
  default: undefined,
});
