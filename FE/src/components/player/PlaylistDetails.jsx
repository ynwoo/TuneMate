import React, { useEffect, useState } from "react";
import Player from "./Player";
import Image from "next/image";
import styles from "@/styles/PlayerPage.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRecoilState } from "recoil";
import { PickTrack } from "@/store/atom";

function PlaylistDetails({ playlistDetails, accessToken }) {
  const [playTrack, setPlayTrack] = useState([]);
  const [pick, setPick] = useRecoilState(PickTrack);
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
    setPick(track);
    console.log("p", pick);
  }

  if (!playlistDetails) {
    return <div>상세 정보를 불러오는 중...</div>;
  }

  return (
    <div className={styles["playlist-details"]}>
      <h3>플레이리스트 상세 정보</h3>
      <p>플레이리스트 이름: {playlistDetails.name}</p>
      {playlistDetails.owner && (
        <p>플레이리스트 소유자: {playlistDetails.owner.display_name}</p>
      )}

      <h5>곡 목록</h5>
      <div>
        <Player accessToken={accessToken} playTrack={playTrack} />
      </div>
      <div>
        {playlistDetails.tracks.items.map((track, index) => (
          <span key={index} style={{ cursor: "pointer", margin: 10 }}>
            <div
              style={{ display: "flex", border: "1px solid blue" }}
              onClick={() => handlePlay(track)}
            >
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
