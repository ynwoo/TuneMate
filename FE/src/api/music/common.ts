import { NewCommonPlayList, PlayList } from '@/types/playList';
import { authApi } from '..';
import { AddTrack, ChangeTrack, DeleteTrack } from '@/types/spotify';

const COMMON_PLAYLISTS_URL = 'music/common/playlists';

// 공동 플레이리스트 조회
const getCommonPlayList = async (
  playlistId: PlayList['id'],
): Promise<PlayList> => {
  const response = await authApi.get<PlayList>(
    `${COMMON_PLAYLISTS_URL}/${playlistId}`,
  );
  return response.data;
};
// 공동 플레이리스트 생성
const createCommonPlayList = async (newCommonPlayList: NewCommonPlayList) => {
  await authApi.post<void>(COMMON_PLAYLISTS_URL, newCommonPlayList);
};
// 공동 플레이리스트 트랙 추가
const createCommonPlayListTrack = async ({
  playlistId,
  uris,
  position,
}: AddTrack) => {
  await authApi.post<void>(`${COMMON_PLAYLISTS_URL}/${playlistId}/tracks`, {
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
  await authApi.delete<void>(`${COMMON_PLAYLISTS_URL}/${playlistId}/tracks`, {
    tracks: [{ uri, positions }],
  });
};
// 공동 플레이리스트 트랙 순서 변경
const updateCommonPlayListTrack = async ({
  playlistId,
  changeTrackIndex,
}: ChangeTrack) => {
  await authApi.put<void>(
    `${COMMON_PLAYLISTS_URL}/${playlistId}/tracks`,
    changeTrackIndex,
  );
};

export {
  getCommonPlayList,
  createCommonPlayList,
  createCommonPlayListTrack,
  deleteCommonPlayListTrack,
  updateCommonPlayListTrack,
};
