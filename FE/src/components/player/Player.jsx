import SpotifyPlayer from "react-spotify-web-playback";
import { useEffect, useState } from "react";
import "../../styles/Player.module.css";

export default function CustomPlayer({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false);
  useEffect(() => setPlay(true), [trackUri]);
  if (!accessToken) return null;

  return (
    <div className="custom-player">
      {/* 원하는 커스텀 UI 요소 추가 */}
      <div className="custom-controls">
        {/* 컨트롤 버튼 또는 다른 사용자 지정 UI 추가 */}
      </div>
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        callback={(state) => {
          if (!state.isPlaying) setPlay(false);
        }}
        play={play}
        uris={trackUri ? [trackUri] : []}
      />
    </div>
  );
}
