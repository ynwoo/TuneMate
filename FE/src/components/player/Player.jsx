import SpotifyPlayer from "react-spotify-web-playback";
import { useEffect, useState } from "react";
import {
  MainplaylistState,
  PickTrackUriState,
  currentTrackIndexState,
  AlubumArtState,
  AlbumState,
} from "@/store/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import Image from "next/image";
import styles from "@/components/player/Album.module.css";

export default function CustomPlayer({ accessToken, playTrack }) {
  const [play, setPlay] = useState(false);
  // const AlubumArt = useRecoilValue(AlubumArtState);
  const [AlubumArt, setAlubumArt] = useRecoilState(AlubumArtState);
  const [currentTrackIndex, setCurrentTrackIndex] = useRecoilState(
    currentTrackIndexState
  );
  const PickTrackUri = useRecoilValue(PickTrackUriState);
  const Mainplaylist = useRecoilValue(MainplaylistState);
  const [playTracks, setPlayTracks] = useState(playTrack);
  const Album = useRecoilValue(AlbumState);
  console.log("Mainplaylist", Mainplaylist);
  const playAllTracks = () => {
    if (Mainplaylist && Mainplaylist.length > 0) {
      setPlay(true);
    } else {
      console.error("playTrack is undefined or empty.");
    }
  };

  // 앨범아트 바꾸기
  // useEffect(() => {
  //   setAlubumArt(Album[currentTrackIndex]);
  // }, [AlubumArt]);

  const playNextTrack = () => {
    console.log("playNextTrack 실행");
    if (currentTrackIndex < Mainplaylist.length - 1) {
      setCurrentTrackIndex((prevIndex) => prevIndex + 1);
    } else {
      setCurrentTrackIndex(0);
    }
    setPlay(true);
  };

  const handlePlaybackChange = (state) => {
    if (!state.isPlaying) {
      playNextTrack();
      console.log("currentTrackIndex1", currentTrackIndex);
    }
  };

  console.log("currentTrackIndex", currentTrackIndex);

  useEffect(() => {
    if (!Mainplaylist || Mainplaylist.length === 0) {
      setPlay(false);
    }
  }, [Mainplaylist]);

  useEffect(() => {
    // PickTrackUri 값이 변경될 때마다 해당 URI로 트랙을 변경
    if (PickTrackUri) {
      setPlayTracks([PickTrackUri]);
      setPlay(true);
    }
  }, [PickTrackUri, setPlayTracks, setPlay]); // Ensure to include setPlay in the dependency array

  const newArr = Mainplaylist.slice(currentTrackIndex).concat(
    Mainplaylist.slice(0, currentTrackIndex)
  );

  if (!accessToken) return null;

  console.log("AAlbum", Album);
  return (
    <div className="custom-player" style={{ width: 300, height: 200 }}>
      <div className="custom-controls"></div>
      {/* <button onClick={playAllTracks}>전체 재생</button> */}
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        callback={handlePlaybackChange}
        play={play}
        uris={newArr}
      />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        className={styles.rotatingImageContainer}
      >
        <Image src={AlubumArt} alt={Album} width={200} height={200} />
      </div>
    </div>
  );
}
