import Player from "@/components/player/Player";
import { Storage } from "@/utils/storage";
import { useRecoilValue } from "recoil";
import { PickTrack } from "@/store/atom";
import { useMemo, useEffect, useState } from "react";
import Image from "next/image";

export default function SinglePlayer() {
  const playTrack = useRecoilValue(PickTrack);
  const [play, setPlay] = useState([]);
  const [accessToken, setAccessToken] = useState<string>("");
  const [playuri, setPlayuri] = useState<string>("");
  const [trackImg, setTrackImg] = useState<string>("");
  console.log("playTrack", playTrack.track.album.images[0].url);

  useEffect(() => {
    setPlay(playTrack);
    setPlayuri(playTrack.track.uri);
    setTrackImg(playTrack.track.album.images[0].url);
  }, [playTrack]);

  useEffect(() => {
    const spotifyAccessToken = Storage.getSpotifyAccessToken;
    setAccessToken(spotifyAccessToken);
  }, []);
  return (
    <div
      style={{
        border: "1px solid blue",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <div>
        <Image src={trackImg} alt={trackImg} width={200} height={200} />
      </div>

      <Player accessToken={accessToken} playTrack={playuri} />
    </div>
  );
}
