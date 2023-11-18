import usePlayList from "@/hooks/usePlayList";
import { classNameWrapper } from "@/utils/className";
import { MouseEvent, useMemo } from "react";
import SpotifyWebPlayer from "react-spotify-web-playback";
import styles from "./Player.module.css";
import Props from "@/types";
import Icon from "@/components/icons";
import useIndividualPlayListRepresentativeQuery from "@/hooks/queries/music/individual/useIndividualPlayListRepresentativeQuery";
import { useRecoilValue } from "recoil";
import { myPlayListState } from "@/store/playList";
import useUserInfo from "@/hooks/useUserInfo";

interface PlayerProps extends Props {
  //
}

const Player = ({ className }: PlayerProps) => {
  const userInfo = useUserInfo();
  const { playerCallback, play, uris } = usePlayList();
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

  return (
    <div className={classNameWrapper(styles.player, className)} onClick={onClick}>
      {userInfo?.spotifyAccessToken && (
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
          token={userInfo.spotifyAccessToken}
          showSaveIcon
          callback={playerCallback}
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
