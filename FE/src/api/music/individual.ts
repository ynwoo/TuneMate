import { NewPlayList, PlayList, TotalPlayList } from "@/types/playList";
import { AddTrack, ChangeTrack, DeleteTrack } from "@/types/spotify";
import { UserInfo } from "@/types/user";
import { api, spotifyApi } from "..";

const INDIVIDUAL_PLAYLISTS_URL = "music-service/individual/playlists";

// 개인 플레이리스트 생성
const createIndividualPlayList = async (newPlayList: NewPlayList) => {
  await api.post<void>(INDIVIDUAL_PLAYLISTS_URL, newPlayList);
};

// 개인 대표 플레이리스트 조회
const getIndividualPlayListRepresentative = async (): Promise<PlayList> => {
  const response = await api.get<PlayList>(
    `${INDIVIDUAL_PLAYLISTS_URL}-representative`
  );
  return response.data;
};

// 개인 플레이리스트 목록조회
const getIndividualPlayLists = async (
  userId: UserInfo["userId"]
): Promise<any> => {
  const response = await spotifyApi.get(`users/${userId}/playlists`);
  return response.data.items;
};

// 개인 대표 플레이리스트 트랙 추가
const createIndividualPlayListTrack = async ({
  playlistId,
  uris,
  position,
}: AddTrack) => {
  await api.post<void>(`${INDIVIDUAL_PLAYLISTS_URL}/${playlistId}/tracks`, {
    uris,
    position,
  });
};

// 개인 대표 플레이리스트 트랙 삭제
const deleteIndividualPlayListTrack = async ({
  playlistId,
  uri,
  positions,
}: DeleteTrack) => {
  await api.delete<void>(`${INDIVIDUAL_PLAYLISTS_URL}/${playlistId}/tracks`, {
    data: { tracks: [{ uri, positions }] },
  });
};

// 개인 플레이리스트 트랙 순서 변경
const updateIndividualPlayListTrack = async ({
  playlistId,
  changeTrackIndex,
}: ChangeTrack) => {
  await api.put<void>(
    `${INDIVIDUAL_PLAYLISTS_URL}/${playlistId}/tracks`,
    changeTrackIndex
  );
};

// 대표 플레이리스트 설정
const updateIndividualPlayList = async (playlistId: PlayList["id"]) => {
  await api.put<void>(INDIVIDUAL_PLAYLISTS_URL, { playlistId });
};

// 노래 재생 카운트
const addIndividualMusicCount = async () => {
  await api.post<void>(`music/individual/count`);
};

// 타인 프로필 조회
const getOthersProfile = async (userId: string): Promise<any> => {
  const response = await api.get<any>(
    `music-service/individual/info/${userId}`
  );
  return response.data;
};

// 타인 대표 플레이리스트 조회
const getOthersPlayList = async (playlistId: string): Promise<any> => {
  const response = await spotifyApi.get<any>(`playlists/${playlistId}`);
  return response.data;
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
  getOthersProfile,
  getOthersPlayList,
};
