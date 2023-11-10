import Player from "@/components/player/Player";
import { Storage } from "@/utils/storage";
import { useRecoilValue } from "recoil";
import { PickTrackState } from "@/store/atom";
import { useMemo, useEffect, useState } from "react";
import Image from "next/image";
import AlbumArt from "./AlbumArt";
import { playlistState } from "@/store/atom";
import { ListInfoState } from "@/store/atom";

export default function SinglePlayer() {
  const PickTrack = useRecoilValue(PickTrackState);
  const ListInfo = useRecoilValue(ListInfoState);
  const [play, setPlay] = useState([]);
  const [accessToken, setAccessToken] = useState<string>("");
  const [playuri, setPlayuri] = useState<string>("");
  const [trackImg, setTrackImg] = useState<string>("");
  console.log("Playyyy", ListInfo);
  useEffect(() => {
    if (PickTrack) {
      console.log(PickTrack, "2");
      setPlay(PickTrack);
      setPlayuri(PickTrack.uri);
      setTrackImg(PickTrack.album.images[0].url);
      console.log("왔어");
    } else if (ListInfo) {
      setPlay(ListInfo);
      setPlayuri(ListInfo.uri);
      setTrackImg(ListInfo.album.images[0].url);
      console.log("안왔어");
    }
  }, [ListInfo, PickTrack]);

  useEffect(() => {
    const spotifyAccessToken = Storage.getSpotifyAccessToken;
    setAccessToken(spotifyAccessToken);
  }, []);

  console.log("first", ListInfo);

  if (!ListInfo) {
    return <></>;
  }
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
        {/* <AlbumArt trackImg={trackImg} /> */}
        {trackImg && (
          <Image src={trackImg} alt={trackImg} width={200} height={200} />
        )}
      </div>

      {playuri && <Player accessToken={accessToken} playTrack={playuri} />}
    </div>
  );
}
