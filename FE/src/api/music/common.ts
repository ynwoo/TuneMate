import { NewCommonPlayList, PlayList } from "@/types/playList";
import { AddTrack, ChangeTrack, DeleteTrack } from "@/types/spotify";
import { api } from "..";

const COMMON_PLAYLISTS_URL = "music-service/common/playlists";
const COMMON_SSE_PLAYLISTS_URL = "music-service/common/sse/playlists";

// 공동 플레이리스트 조회
const getCommonPlayList = async (
  relationId: number
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
  playlistId,
  uris,
  position,
}: AddTrack) => {
  await api.post<void>(`${COMMON_PLAYLISTS_URL}/${playlistId}/tracks`, {
    uris,
    position,
  });
};
// 공동 플레이리스트 트랙 삭제
const deleteCommonPlayListTrack = async ({
  playlistId,
  uri,
  positions,
}: DeleteTrack) => {
  await api.delete<void>(`${COMMON_PLAYLISTS_URL}/${playlistId}/tracks`, {
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
