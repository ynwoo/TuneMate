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
  AlbumState,
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
  const [playList, setPlayList] = useRecoilState(playlistState);
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
  useEffect(() => {
    setAlubumArt(Album[currentTrackIndex]);
    // setAlubumArt(PickTrack.album.images[0].uri);
    // console.log("경우2", PickTrack.album.images[0].uri);
    // setPlayList(Mainplaylist);
  }, [AlubumArt, currentTrackIndex]);

  const playNextTrack = () => {
    console.log("playNextTrack 실행");
    if (currentTrackIndex < Mainplaylist.length - 1) {
      setCurrentTrackIndex((prevIndex) => prevIndex + 1);
    } else {
      setCurrentTrackIndex(0);
    }
    setPlay(true);
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
  // uri만 모여있는 리스트에서 uri 뽑아넣기
  // const newArr = useMemo(() => {
  //   return Mainplaylist.slice(currentTrackIndex).concat(
  //     Mainplaylist.slice(0, currentTrackIndex)
  //   );
  // }, [Mainplaylist, currentTrackIndex]);

  console.log("AAlbum", Album);
  return (
    <div className="custom-player" style={{ width: 300, height: 200 }}>
      <div className="custom-controls"></div>
      {/* <button onClick={playAllTracks}>전체 재생</button> */}
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        callback={(state) => {
          // playNextTrack();
          if (!state.isPlaying && state.duration - state.position < 1000) {
            playNextTrack();
          }
        }}
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
