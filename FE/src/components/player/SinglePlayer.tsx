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

export default function SinglePlayer() {
  const PickTrack = useRecoilValue(PickTrackState);
  const ListInfo = useRecoilValue(ListInfoState);
  const Mainplaylist = useRecoilValue(MainplaylistState);
  const reAlbumArt = useRecoilValue(reAlbumArtState);
  const reSongUrl = useRecoilValue(reSongUrlState);
  const [AlubumArt, setAlbumArt] = useRecoilState(AlubumArtState);
  const [play, setPlay] = useState([]);
  const [accessToken, setAccessToken] = useState<string>("");
  const [playuri, setPlayuri] = useState<string>("");
  const [trackImg, setTrackImg] = useState<string>("");
  // console.log("Mainplaylist", Mainplaylist);
  console.log("PickTrack", PickTrack);
  console.log("reSongUrl", reSongUrl);

  useEffect(() => {
    if (PickTrack) {
      setPlay(PickTrack);
      // console.log("PIck", PickTrack);

      if (reSongUrl && reAlbumArt) {
        // setPlayuri(reSongUrl);
        setAlbumArt(reAlbumArt);
      } else if (
        PickTrack.album &&
        PickTrack.album.images &&
        PickTrack.album.images.length > 0
      ) {
        setPlayuri(PickTrack.uri);
        setAlbumArt(PickTrack.album.images[0].url);
      }
      console.log("왔어");
    } else if (ListInfo) {
      setPlay(ListInfo);
      if (reSongUrl && reAlbumArt) {
        // setPlayuri(reSongUrl);
        setAlbumArt(reAlbumArt);
      } else if (
        ListInfo.album &&
        ListInfo.album.images &&
        ListInfo.album.images.length > 0
      ) {
        setPlayuri(ListInfo.uri);
        setAlbumArt(ListInfo.album.images[0].url);
      }
      console.log("안왔어");
      console.log(reAlbumArt);
      console.log(reSongUrl);
    }
  }, [ListInfo, PickTrack, reSongUrl, reAlbumArt]);

  useEffect(() => {
    const spotifyAccessToken = Storage.getSpotifyAccessToken;
    setAccessToken(spotifyAccessToken);
  }, []);
  const [isSlideUp, setIsSlideUp] = useState(false);

  const handleClick = () => {
    setIsSlideUp((prev) => !prev);
  };

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
        border: "1px solid lightgrey",
        borderRadius: "10px",
        // alignItems: "center",
        // justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        // paddingBottom: "40px",
        top: 570,
        height: "600px",
        position: "fixed",
        backgroundColor: "white",
        transition: "transform 0.3s ease-in-out",
        transform: isClicked ? "translateY(-400px)" : "translateY(0)",
      }}
      onClick={toggleTransform}
    >
      {/* 내용 */}
      {playuri && <Player accessToken={accessToken} playTrack={playuri} />}

      {reSongUrl && <Player accessToken={accessToken} playTrack={reSongUrl} />}
    </div>
  );
}
