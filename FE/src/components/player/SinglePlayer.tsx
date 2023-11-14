import Player from "@/components/player/Player";
import { Storage } from "@/utils/storage";
import { useRecoilValue, useRecoilState } from "recoil";
import { PickTrackState } from "@/store/atom";
import { useMemo, useEffect, useState } from "react";
import Image from "next/image";
import AlbumArt from "./AlbumArt";
import { playlistState } from "@/store/atom";
import {
  ListInfoState,
  MainplaylistState,
  AlubumArtState,
  reAlbumArtState,
  reSongUrlState,
} from "@/store/atom";
import "animate.css/animate.min.css";
import Dashboard from "@/components/player/Dashboards";
import styles from "@/styles/MainPage.module.css";
import useRecommendationSongsQuery from "@/hooks/queries/recommendation/useRecommendationSongsQuery";

export default function SinglePlayer() {
  const PickTrack = useRecoilValue(PickTrackState);
  const ListInfo = useRecoilValue(ListInfoState);
  const [AlubumArt, setAlbumArt] = useRecoilState(AlubumArtState);
  const [play, setPlay] = useState({});
  const [accessToken, setAccessToken] = useState<string>("");
  const [playuri, setPlayuri] = useState<string>("");
  console.log("single", playuri);
  console.log("PickTrack", PickTrack);

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

  const [isClicked, setIsClicked] = useState(false);

  const toggleTransform = () => {
    setIsClicked(!isClicked);
  };

  const { data: recommendedSongs } = useRecommendationSongsQuery();

  const uriArray = recommendedSongs?.map((song) => song.uri);

  if (!ListInfo) {
    return <></>;
  }
  return (
    <div
      style={{
        border: "2px solid lightgrey",
        borderRadius: "10px",
        alignItems: "center",
        // justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        // paddingBottom: "40px",
        top: 570,
        height: "100%",
        overflowY: "auto",
        position: "fixed",
        backgroundColor: "white",
        transition: "transform 0.3s ease-in-out",
        transform: isClicked ? "translateY(-400px)" : "translateY(0)",
        zIndex: 9,
      }}
      onClick={toggleTransform}
    >
      {/* 내용 */}

      {<Player accessToken={accessToken} playTrack={playuri} />}
    </div>
  );
}
