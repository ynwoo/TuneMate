import useIndividualPlayListRepresentativeQuery from "@/hooks/queries/music/individual/useIndividualPlayListRepresentativeQuery";
import Props from "@/types";
import { PlayList } from "@/types/playList";
import { Track, TrackInfo } from "@/types/spotify";
import { Convert } from "@/utils/convert";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";

export interface PlayListContextState {
  playList?: PlayList;
  play: boolean;
  uris: string[];
  images: string[];
  currentTrackIndex: number;
  changePlayList: (playList: PlayList | Track | TrackInfo[], idx?: number) => void;
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
      }) => images[0].url
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

  const changePlayList = useCallback(
    (playList: PlayList | Track | TrackInfo[], idx: number = 0) => {
      let newPlayList = undefined;
      if ("description" in playList) {
        newPlayList = playList;
      } else if ("album" in playList) {
        newPlayList = Convert.trackToPlayList(playList);
      } else {
        newPlayList = Convert.trackInfosToPlayList(playList);
      }
      console.log(playList, newPlayList);

      setPlayList(Convert.changeTrackOrder(newPlayList, idx));
      setCurrentTrackIndex(idx);
    },
    []
  );

  useEffect(() => {
    if (individualPlayList) {
      setPlayList(individualPlayList);
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
