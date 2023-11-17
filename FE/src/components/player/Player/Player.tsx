import usePlayList from "@/hooks/usePlayList";
import { classNameWrapper } from "@/utils/className";
import { Storage } from "@/utils/storage";
import { MouseEvent, useEffect, useState, useMemo } from "react";
import SpotifyWebPlayer from "react-spotify-web-playback";
import styles from "./Player.module.css";
import Props from "@/types";
import Icon from "@/components/icons";
import useIndividualPlayListRepresentativeQuery from "@/hooks/queries/music/individual/useIndividualPlayListRepresentativeQuery";
import { useRecoilValue } from "recoil";
import { myPlayListState } from "@/store/playList";

interface PlayerProps extends Props {
  //
}

const Player = ({ className }: PlayerProps) => {
  const [token, setToken] = useState<string>();
  const { addTrackToMyPlayList, deleteTrackToMyPlayList, currentTrack } = usePlayList();
  const { data: individualPlayList } = useIndividualPlayListRepresentativeQuery();
  const myPlayList = useRecoilValue(myPlayListState);

  const alreadyExist = useMemo(() => {
    if (!individualPlayList || !currentTrack) return false;
    const uris = individualPlayList.tracks.items.map(({ track: { uri } }) => uri);
    return uris.includes(currentTrack.uri);
  }, [individualPlayList, currentTrack]);

  const onClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const token = Storage.getSpotifyAccessToken();
      if (token) {
        setToken(Storage.getSpotifyAccessToken());
        clearInterval(timer);
      }
    }, 200);
  }, []);

  const { playerCallback: playNextTrack, play, uris } = usePlayList();
  return (
    <div className={classNameWrapper(styles.player, className)} onClick={onClick}>
      {token && (
        <SpotifyWebPlayer
          styles={{
            activeColor: "#fff",
            bgColor: "#333",
            color: "#fff",
            loaderColor: "#fff",
            sliderColor: "#1cb954",
            trackArtistColor: "#ccc",
            trackNameColor: "#fff",
          }}
          token={token}
          showSaveIcon
          callback={playNextTrack}
          play={play}
          uris={uris}
        />
      )}
      {!alreadyExist ? (
        <div
          className={styles["player__button--plus"]}
          onClick={() => addTrackToMyPlayList(myPlayList)}
        >
          <Icon.Plus size="lg" className={styles["player__button--plus-icon"]} />
        </div>
      ) : (
        <div
          className={styles["player__button--plus"]}
          onClick={() => deleteTrackToMyPlayList(myPlayList)}
        >
          <Icon.Delete size="lg" className={styles["player__button--plus-icon"]} />
        </div>
      )}
    </div>
  );
};

export default Player;
