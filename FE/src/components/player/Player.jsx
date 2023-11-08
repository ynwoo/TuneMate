import SpotifyPlayer from "react-spotify-web-playback";
import { useEffect, useState } from "react";
import "../../styles/Player.module.css";

export default function CustomPlayer({ accessToken, playTrack, playlist }) {
  const [play, setPlay] = useState(false);
  const [playTracks, setPlayTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    setPlay(true);
  }, [playTrack]);
  console.log("playTrack", playTrack);
  console.log("playTracks", playTracks);

  const playAllTracks = () => {
    if (playTrack && playTrack.length > 0) {
      // playTrack의 각 요소를 uri 배열로 만듭니다.
      setPlayTracks(playTrack);
      setPlay(true);
      console.log("2", playTracks);
    } else {
      console.error("playTrack is undefined or empty.");
    }
  };

  const playNextTrack = () => {
    if (currentTrackIndex < playTrack.length - 1) {
      setCurrentTrackIndex((prevIndex) => prevIndex + 1);
    } else {
      setCurrentTrackIndex(0);
    }
    setPlay(true);
  };

  if (!accessToken) return null;

  return (
    <div className="custom-player">
      <div className="custom-controls">
        <button onClick={playAllTracks}>전체 재생</button>
        <button onClick={playNextTrack}>다음 곡 재생</button>
      </div>
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        callback={(state) => {
          if (!state.isPlaying && state.duration - state.position < 1000) {
            playNextTrack();
          }
        }}
        play={play}
        uris={playTrack.length > 0 ? playTrack : []}
      />
    </div>
  );
}
