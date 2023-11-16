import { NewCommonPlayList, PlayList } from "@/types/playList";
import {
  AddCommonTrack,
  ChangeTrack,
  DeleteCommonTrack,
} from "@/types/spotify";
import { api } from "..";
import { Friend } from "@/types/social";

const COMMON_PLAYLISTS_URL = "music-service/common/playlists";
const COMMON_SSE_PLAYLISTS_URL = "music-service/common/sse/playlists";

// 공동 플레이리스트 조회
const getCommonPlayList = async (
  relationId: Friend["relationId"]
): Promise<PlayList> => {
  const response = await api.get<PlayList>(
    `${COMMON_SSE_PLAYLISTS_URL}/${relationId}`
  );
  return response.data;
};
// 공동 플레이리스트 생성
const createCommonPlayList = async (newCommonPlayList: NewCommonPlayList) => {
  await api.post<void>(COMMON_PLAYLISTS_URL, newCommonPlayList);
};
// 공동 플레이리스트 트랙 추가
const createCommonPlayListTrack = async ({
  relationId,
  uris,
  position,
}: AddCommonTrack) => {
  await api.post<void>(`${COMMON_PLAYLISTS_URL}/${relationId}/tracks`, {
    uris,
    position,
  });
};
// 공동 플레이리스트 트랙 삭제
const deleteCommonPlayListTrack = async ({
  relationId,
  uri,
  positions,
}: DeleteCommonTrack) => {
  await api.delete<void>(`${COMMON_PLAYLISTS_URL}/${relationId}/tracks`, {
    data: { tracks: [{ uri, positions }] },
  });
};
// 공동 플레이리스트 트랙 순서 변경
const updateCommonPlayListTrack = async ({
  playlistId,
  changeTrackIndex,
}: ChangeTrack) => {
  await api.put<void>(
    `${COMMON_PLAYLISTS_URL}/${playlistId}/tracks`,
    changeTrackIndex
  );
};

export {
  getCommonPlayList,
  createCommonPlayList,
  createCommonPlayListTrack,
  deleteCommonPlayListTrack,
  updateCommonPlayListTrack,
};
