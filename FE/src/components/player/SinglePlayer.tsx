import Player from "@/components/player/Player";
import { Storage } from "@/utils/storage";
import { useRecoilValue, useRecoilState } from "recoil";
import { PickTrackState } from "@/store/atom";
import { useMemo, useEffect, useState } from "react";
import Image from "next/image";
import AlbumArt from "./AlbumArt";
import { playlistState } from "@/store/atom";
import { ListInfoState, MainplaylistState, AlubumArtState } from "@/store/atom";
import "animate.css/animate.min.css";

export default function SinglePlayer() {
  const PickTrack = useRecoilValue(PickTrackState);
  const ListInfo = useRecoilValue(ListInfoState);
  const Mainplaylist = useRecoilValue(MainplaylistState);
  const [AlubumArt, setAlbumArt] = useRecoilState(AlubumArtState);
  const [play, setPlay] = useState([]);
  const [accessToken, setAccessToken] = useState<string>("");
  const [playuri, setPlayuri] = useState<string>("");
  const [trackImg, setTrackImg] = useState<string>("");
  // console.log("Mainplaylist", Mainplaylist);
  // console.log("PickTrack", PickTrack);

  useEffect(() => {
    if (PickTrack) {
      // console.log(PickTrack, "2");
      setPlay(PickTrack);
      setPlayuri(PickTrack.uri);
      setAlbumArt(PickTrack.album.images[0].url);
      console.log("왔어");
    } else if (ListInfo) {
      setPlay(ListInfo);
      setPlayuri(ListInfo.uri);
      setAlbumArt(ListInfo.album.images[0].url);
      console.log("안왔어");
    }
  }, [ListInfo, PickTrack]);

  useEffect(() => {
    const spotifyAccessToken = Storage.getSpotifyAccessToken;
    setAccessToken(spotifyAccessToken);
  }, []);
  const [isSlideUp, setIsSlideUp] = useState(false);

  const handleClick = () => {
    setIsSlideUp((prev) => !prev);
  };

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
        {AlubumArt && (
          <Image src={AlubumArt} alt={AlubumArt} width={200} height={200} />
        )}
      </div>
      {playuri && <Player accessToken={accessToken} playTrack={playuri} />}
    </div>
  );
}
