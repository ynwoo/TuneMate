import SpotifyPlayer from "react-spotify-web-playback";
import { useEffect, useState } from "react";

export default function CustomPlayer({ accessToken, playTrack, playlist }) {
  const [play, setPlay] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const playAllTracks = () => {
    if (playTrack && playTrack.length > 0) {
      setPlay(true);
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

  useEffect(() => {
    if (!playTrack || playTrack.length === 0) {
      setPlay(false);
    }
  }, [playTrack]);

  useEffect(() => {
    if (!playTrack || playTrack.length === 0) {
      setPlay(false);
    }
  }, [playTrack]);

  if (!accessToken) return null;

  return (
    <div className="custom-player">
      <div className="custom-controls">
        <button onClick={playAllTracks}>전체 재생</button>
      </div>
      {play && (
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
      )}
    </div>
  );
}
