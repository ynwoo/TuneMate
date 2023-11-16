import useIndividualPlayListRepresentativeQuery from "@/hooks/queries/music/individual/useIndividualPlayListRepresentativeQuery";
import Props from "@/types";
import { PlayList } from "@/types/playList";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";

export interface PlayListContextState {
  playList?: PlayList;
  play: boolean;
  uris: string[];
  images: string[];
  currentTrackIndex: number;
  changePlayList: (playList: PlayList, idx?: number) => void;
  playNextTrack: () => void;
}

export const PlayListContext = createContext<PlayListContextState>({} as PlayListContextState);

const PlayListProvider = ({ children }: Props) => {
  const [playList, setPlayList] = useState<PlayList>();
  const [play, setPlay] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const { data: individualPlayList } = useIndividualPlayListRepresentativeQuery();

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
      }) => images[0].uri
    );

    return { uris, images };
  }, [playList]);

  const playNextTrack = useCallback(() => {
    if (currentTrackIndex < uris.length - 1) {
      setCurrentTrackIndex((prevIndex) => prevIndex + 1);
    } else {
      setCurrentTrackIndex(0);
    }
    setPlay(true);
  }, [currentTrackIndex]);

  const changePlayList = useCallback((playList: PlayList, idx: number = 0) => {
    setPlayList(playList);
    setCurrentTrackIndex(0);
  }, []);

  useEffect(() => {
    if (individualPlayList) {
      changePlayList(individualPlayList);
    }
  }, [individualPlayList]);

  const playListContextState: PlayListContextState = useMemo(
    () => ({
      playList,
      play,
      uris,
      images,
      currentTrackIndex,
      changePlayList,
      playNextTrack,
    }),
    [playList, play]
  );

  return (
    <PlayListContext.Provider value={playListContextState}>{children}</PlayListContext.Provider>
  );
};

export default PlayListProvider;
