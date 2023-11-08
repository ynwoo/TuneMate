import React, { useEffect, useState } from "react";
import Player from "./Player";
import Image from "next/image";
import Login from "./Login";

function PlaylistDetails({ playlistDetails, chooseTrack, accessToken }) {
  const [playTrackIndex, setPlayTrackIndex] = useState(0);
  const [playTrack, setPlayTrack] = useState([]);
  // 페이지 로드 시 플레이리스트의 모든 곡을 playTrack에 추가
  useEffect(() => {
    if (playlistDetails) {
      const allUris = playlistDetails.tracks.items.map(
        (track) => track.track.uri
      );
      setPlayTrack(allUris);
    }
  }, [playlistDetails]);

  function handlePlay(track) {
    // 선택한 곡이 이미 playTrack에 있는지 확인
    const isTrackInPlayList = playTrack.includes(track.track.uri);

    // 선택한 곡이 없을 경우에만 추가
    if (!isTrackInPlayList) {
      setPlayTrack((prevPlayTrack) => [...prevPlayTrack, track.track.uri]);
    }
  }

  function playNextTrack() {
    if (playTrackIndex < playlistDetails.tracks.items.length - 1) {
      setPlayTrackIndex((prevIndex) => prevIndex + 1);
    } else {
      // 마지막 곡이면 첫 번째 곡으로 돌아감
      setPlayTrackIndex(0);
    }
  }

  if (!playlistDetails) {
    return <div>상세 정보를 불러오는 중...</div>;
  }

  return (
    <div>
      <h2>플레이리스트 상세 정보</h2>
      <p>플레이리스트 이름: {playlistDetails.name}</p>
      {playlistDetails.owner && (
        <p>플레이리스트 소유자: {playlistDetails.owner.display_name}</p>
      )}

      <h3>곡 목록</h3>
      <div>
        <Player accessToken={accessToken} playTrack={playTrack} />
        <button onClick={playNextTrack}>다음 곡 재생</button>
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
