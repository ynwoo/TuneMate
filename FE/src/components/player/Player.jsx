import SpotifyPlayer from "react-spotify-web-playback";
import { useEffect, useState, useMemo } from "react";
import {
  playlistState,
  ListInfoState,
  PickTrackState,
  MainplaylistState,
  PickTrackUriState,
  currentTrackIndexState,
  reSongUrlState,
  AlubumArtState,
} from "@/store/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import Image from "next/image";
import styles from "@/components/player/Album.module.css";

export default function CustomPlayer({ accessToken, playTrack }) {
  const [play, setPlay] = useState(false);
  const ListInfo = useRecoilValue(ListInfoState);
  // const AlubumArt = useRecoilValue(AlubumArtState);
  const [AlubumArt, setAlubumArt] = useRecoilState(AlubumArtState);
  const [currentTrackIndex, setCurrentTrackIndex] = useRecoilState(
    currentTrackIndexState
  );
  const [PickTrack, setPickTrack] = useRecoilState(PickTrackState); // Ensure setPickTrack is defined
  const PickTrackUri = useRecoilValue(PickTrackUriState);
  const Mainplaylist = useRecoilValue(MainplaylistState);
  const reSongUrl = useRecoilValue(reSongUrlState);
  const [playList, setPlayList] = useRecoilState(playlistState);
  const [playTracks, setPlayTracks] = useState(playTrack);

  console.log("playTrack", playTrack);
  console.log("ListInfo", ListInfo);
  console.log("앨범아트오셨는지..", ListInfo.album.images[0].url);
  const playAllTracks = () => {
    if (Mainplaylist && Mainplaylist.length > 0) {
      setPlay(true);
    } else {
      console.error("playTrack is undefined or empty.");
    }
  };

  useEffect(() => {
    setPlayList(Mainplaylist);
    setAlubumArt(PickTrack.album.images[0].url);
  }, [Mainplaylist, AlubumArt]);

  const playNextTrack = () => {
    if (currentTrackIndex < Mainplaylist.length - 1) {
      setCurrentTrackIndex((prevIndex) => prevIndex + 1);
    } else {
      setCurrentTrackIndex(0);
    }
    setPlay(true);
  };

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

  if (!accessToken) return null;

  const newArr = useMemo(() => {
    return Mainplaylist.slice(currentTrackIndex).concat(
      Mainplaylist.slice(0, currentTrackIndex)
    );
  }, [Mainplaylist, currentTrackIndex]);

  return (
    <div className="custom-player" style={{ width: 300, height: 200 }}>
      <div className="custom-controls"></div>
      {/* <button onClick={playAllTracks}>전체 재생</button> */}
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        callback={(state) => {
          if (!state.isPlaying && state.duration - state.position < 1000) {
            playNextTrack();
          }
        }}
        play={play}
        uris={playTrack}
      />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        className={styles.rotatingImageContainer}
      >
        <Image src={AlubumArt} alt={AlubumArt} width={200} height={200} />
      </div>
    </div>
  );
}
