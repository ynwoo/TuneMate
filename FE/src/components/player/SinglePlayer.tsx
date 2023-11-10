import Player from "@/components/player/Player";
import { Storage } from "@/utils/storage";
import { useRecoilValue } from "recoil";
import { PickTrack } from "@/store/atom";
import { useMemo, useEffect, useState } from "react";

export default function SinglePlayer() {
  const playTrack = useRecoilValue(PickTrack);
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    const spotifyAccessToken = Storage.getSpotifyAccessToken;
    setAccessToken(spotifyAccessToken);
  }, []);
  return (
    <div>
      <Player accessToken={accessToken} playTrack={playTrack} />
    </div>
  );
}
