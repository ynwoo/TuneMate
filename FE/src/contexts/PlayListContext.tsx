import useAddIndividualMusicCountMutation from "@/hooks/mutations/music/individual/useAddIndividualMusicCountMutation";
import useCreateIndividualPlayListTrackMutation from "@/hooks/mutations/music/individual/useCreateIndividualPlayListTrackMutation";
import useDeleteIndividualPlayListTrackMutation from "@/hooks/mutations/music/individual/useDeleteIndividualPlayListTrackMutation";
import { myPlayListState } from "@/store/playList";
import Props from "@/types";
import { PlayList } from "@/types/playList";
import { AddTrack, DeleteTrack, Track, TrackInfo } from "@/types/spotify";
import { Convert } from "@/utils/convert";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { CallbackState, SpotifyTrack } from "react-spotify-web-playback";
import { useRecoilValue } from "recoil";

type ChangePlayList = PlayList | Track | TrackInfo | TrackInfo[];

export interface PlayListContextState {
  playList?: PlayList;
  play: boolean;
  uris: string[];
  images: string[];
  changePlayList: (playList: ChangePlayList, idx?: number) => void;
  playerCallback: (state: CallbackState) => void;
  addTrackToMyPlayList: () => void;
  deleteTrackToMyPlayList: () => void;
  currentTrack?: SpotifyTrack;
}

export const PlayListContext = createContext<PlayListContextState>({} as PlayListContextState);

const PlayListProvider = ({ children }: Props) => {
  const [playList, setPlayList] = useState<PlayList>();
  const [play, setPlay] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack>();
  const myPlayList = useRecoilValue(myPlayListState);
  const { mutate: addIndividualMusicCount } = useAddIndividualMusicCountMutation();
  const { mutate: createIndividualPlayListTrack } = useCreateIndividualPlayListTrackMutation();
  const { mutate: deleteIndividualPlayListTrack } = useDeleteIndividualPlayListTrackMutation();

  const { uris, images }: { uris: string[]; images: string[] } = useMemo(() => {
    if (!playList) return { uris: [], images: [] };

    const {
      tracks: { items },
    } = playList;
    const uris: string[] = items.map(({ track: { uri } }) => uri);
    const images: string[] = items.map(
      ({
        track: {
          album: { images },
        },
      }) => images[0].url
    );

    return { uris, images };
  }, [playList]);

  const playerCallback = useCallback((state: CallbackState) => {
    if (state.track.uri) {
      setCurrentTrack(state.track);
    }
    setPlay(true);
  }, []);

  const changePlayList = useCallback((playList: ChangePlayList, idx: number = 0) => {
    let newPlayList = undefined;
    if ("description" in playList) {
      newPlayList = playList;
    } else if ("album" in playList) {
      newPlayList = Convert.trackToPlayList(playList);
    } else if ("cover" in playList) {
      newPlayList = Convert.trackInfoToPlayList(playList);
    } else {
      newPlayList = Convert.trackInfosToPlayList(playList);
    }

    setPlayList(Convert.changeTrackOrder(newPlayList, idx));
  }, []);

  const addTrackToMyPlayList = useCallback(() => {
    if (!myPlayList || !currentTrack) return;
    const playlistId = myPlayList.id;
    const uris = [currentTrack.uri];
    const position = myPlayList.tracks.items.length;
    const addTrack: AddTrack = { playlistId, uris, position };
    createIndividualPlayListTrack(addTrack);
  }, [myPlayList, currentTrack]);

  const deleteTrackToMyPlayList = useCallback(() => {
    if (!myPlayList || !currentTrack) return;
    const playlistId = myPlayList.id;
    const uri = currentTrack.uri;
    const positions = [
      myPlayList.tracks.items.map(({ track: { uri } }) => uri).findIndex((myUri) => uri === myUri),
    ];
    const deleteTrack: DeleteTrack = { playlistId, uri, positions };
    deleteIndividualPlayListTrack(deleteTrack);
  }, [myPlayList, currentTrack]);

  // playList 초기값 채우기
  useEffect(() => {
    if (!playList && myPlayList) {
      setPlayList(myPlayList);
    }
  }, [myPlayList]);

  // music count 증가
  useEffect(() => {
    if (!currentTrack?.uri) return;
    const timer = setTimeout(addIndividualMusicCount, 3000);
    return () => clearTimeout(timer);
  }, [currentTrack]);

  const playListContextState: PlayListContextState = useMemo(
    () => ({
      playList,
      play,
      uris,
      images,
      changePlayList,
      playerCallback,
      currentTrack,
      addTrackToMyPlayList,
      deleteTrackToMyPlayList,
    }),
    [playList, play, uris, images, changePlayList, playerCallback, currentTrack]
  );

  return (
    <PlayListContext.Provider value={playListContextState}>{children}</PlayListContext.Provider>
  );
};

export default PlayListProvider;
