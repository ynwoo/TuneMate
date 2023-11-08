import React, { useEffect, useState } from "react";
import Player from "./Player";
import Image from "next/image";
import Login from "./Login";

function PlaylistDetails({ playlistDetails, chooseTrack, accessToken }) {
  const [playTrack, setPlayTrack] = useState(null);
  function handlePlay(track) {
    // chooseTrack(track);
    console.log(track);
    setPlayTrack(track.track.uri);
  }
  if (!playlistDetails) {
    return <div>상세 정보를 불러오는 중...</div>;
  }

  console.log(playlistDetails.tracks.items);

  return (
    <div>
      <h2>플레이리스트 상세 정보</h2>
      <p>플레이리스트 이름: {playlistDetails.name}</p>
      {playlistDetails.owner && (
        <p>플레이리스트 소유자: {playlistDetails.owner.display_name}</p>
      )}

      <h3>곡 목록</h3>
      <div>
        <Player accessToken={accessToken} trackUri={playTrack} />
      </div>
      <div>
        {playlistDetails.tracks.items.map((track, index) => (
          <span
            key={index}
            onClick={() => handlePlay(track)}
            style={{ cursor: "pointer" }}
          >
            <div style={{ display: "flex" }}>
              <Image
                src={track.track.album.images[0].url}
                alt="Album Art"
                width={64}
                height={64}
              />
              <div>
                {track.track.name}
                {/* {track.track.uri} */}
                <div>{track.track.artists[0].name}</div>
              </div>
            </div>
          </span>
        ))}
      </div>
    </div>
  );
}

export default PlaylistDetails;
