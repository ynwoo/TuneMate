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
  AlbumState,
} from "@/store/atom";
import "animate.css/animate.min.css";
import Dashboard from "@/components/player/Dashboards";
import styles from "@/styles/MainPage.module.css";
import useRecommendationSongsQuery from "@/hooks/queries/recommendation/useRecommendationSongsQuery";
import { Track } from "@/types/spotify";

export default function SinglePlayer() {
  const PickTrack = useRecoilValue(PickTrackState);
  const ListInfo = useRecoilValue(ListInfoState);
  const [AlubumArt, setAlbumArt] = useRecoilState(AlubumArtState);
  const [play, setPlay] = useState<Track | undefined>(undefined);
  const [accessToken, setAccessToken] = useState<string>("");
  const [playuri, setPlayuri] = useState<string>("");
  const [album, setAlbum] = useRecoilState(AlbumState);
  const Mainplaylist = useRecoilValue(MainplaylistState);

  console.log("single", playuri);
  console.log("PickTrack", PickTrack);

  console.log("와주라", Mainplaylist);

  useEffect(() => {
    if (PickTrack) {
      // console.log(PickTrack, "2");
      setPlay(PickTrack);
      setPlayuri(PickTrack.uri);
      setAlbumArt(PickTrack.album.images[0].uri);
      setAlbum(PickTrack.album.images[0].uri);
      console.log("앨범아트", AlubumArt);

      console.log("왔어");
    } else if (ListInfo) {
      setPlay(ListInfo);
      setPlayuri(Mainplaylist[0]);
      setAlbumArt(ListInfo.album.images[0].uri);
      setAlbum(ListInfo.album.images[0].uri);
      console.log("안왔어");
      console.log("앨범아트", AlubumArt);
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
