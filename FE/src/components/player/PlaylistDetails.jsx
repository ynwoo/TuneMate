import React, { useEffect, useState } from "react";
import Player from "./Player";
import Image from "next/image";

function PlaylistDetails({ playlistDetails, accessToken }) {
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

  useEffect(() => {
    if (playlistDetails) {
      const allUris = playlistDetails.tracks.items.map(
        (track) => track.track.uri
      );
      setPlayTrack(allUris);
    }
  }, [playlistDetails]); // 새로운 플레이리스트가 선택되었을 때만 실행

  function handlePlay(track) {
    const isTrackInPlayList = playTrack.includes(track.track.uri);

    if (!isTrackInPlayList) {
      setPlayTrack((prevPlayTrack) => [...prevPlayTrack, track.track.uri]);
    }
  }
  import React, { useEffect } from "react";
  import styles from "@/styles/PlayerPage.module.css";

  if (!playlistDetails) {
    return <div>상세 정보를 불러오는 중...</div>;
  }

  return (
    <div className={styles["playlist-details"]}>
      <h2>플레이리스트 상세 정보</h2>
      <p>플레이리스트 이름: {playlistDetails.name}</p>
      {playlistDetails.owner && (
        <p>플레이리스트 소유자: {playlistDetails.owner.display_name}</p>
      )}

      <h3>곡 목록</h3>
      <div>
        <Player accessToken={accessToken} playTrack={playTrack} />
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
