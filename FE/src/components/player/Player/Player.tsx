import usePlayList from "@/hooks/usePlayList";
import { classNameWrapper } from "@/utils/className";
import { Storage } from "@/utils/storage";
import { MouseEvent, useEffect, useState } from "react";
import SpotifyWebPlayer from "react-spotify-web-playback";
import styles from "./Player.module.css";
import Props from "@/types";

interface PlayerProps extends Props {
  //
}

const Player = ({ className }: PlayerProps) => {
  const [token, setToken] = useState<string>();

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

  const { playNextTrack, play, uris } = usePlayList();
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
    </div>
  );
};

export default Player;
