import { NewPlayList, PlayList, TotalPlayList } from '@/types/playList';
import { authApi } from '..';
import { ChangeTrackIndex } from '@/types/spotify';

const INDIVIDUAL_PLAYLISTS_URL = 'music/individual/playlists';

// 개인 플레이리스트 생성
const createIndividualPlayList = async (newPlayList: NewPlayList) => {
  await authApi.post<void>(INDIVIDUAL_PLAYLISTS_URL, newPlayList);
};

// 개인 대표 플레이리스트 조회
const getIndividualPlayListRepresentative = async (
  playlistId: PlayList['id'],
): Promise<PlayList> => {
  const response = await authApi.get<PlayList>(
    `${INDIVIDUAL_PLAYLISTS_URL}-representative/${playlistId}`,
  );
  return response.data;
};

// 개인 플레이리스트 목록조회
const getIndividualPlayLists = async (): Promise<TotalPlayList> => {
  const response = await authApi.get<TotalPlayList>(INDIVIDUAL_PLAYLISTS_URL);
  return response.data;
};

// 개인 대표 플레이리스트 트랙 추가
const createIndividualPlayListTrack = async (
  playlistId: PlayList['id'],
  uris: string[],
  position: number,
) => {
  await authApi.post<void>(`${INDIVIDUAL_PLAYLISTS_URL}/${playlistId}/tracks`, {
    uris,
    position,
  });
};

// 개인 대표 플레이리스트 트랙 삭제
const deleteIndividualPlayListTrack = async (
  playlistId: PlayList['id'],
  uri: string,
  positions: number[],
) => {
  await authApi.delete<void>(
    `${INDIVIDUAL_PLAYLISTS_URL}/${playlistId}/tracks`,
    { tracks: [{ uri, positions }] },
  );
};

// 개인 플레이리스트 트랙 순서 변경
const updateIndividualPlayListTrack = async (
  playlistId: PlayList['id'],
  changeTrackIndex: ChangeTrackIndex,
) => {
  await authApi.put<void>(
    `${INDIVIDUAL_PLAYLISTS_URL}/${playlistId}/tracks`,
    changeTrackIndex,
  );
};

// 대표 플레이리스트 설정
const updateIndividualPlayList = async (playlistId: PlayList['id']) => {
  await authApi.put<void>(INDIVIDUAL_PLAYLISTS_URL, { playlistId });
};

// 노래 재생 카운트
const addIndividualMusicCount = async () => {
  await authApi.post<void>(`music/individual/count`);
};

export {
  createIndividualPlayList,
  getIndividualPlayListRepresentative,
  getIndividualPlayLists,
  createIndividualPlayListTrack,
  deleteIndividualPlayListTrack,
  updateIndividualPlayListTrack,
  updateIndividualPlayList,
  addIndividualMusicCount,
};
