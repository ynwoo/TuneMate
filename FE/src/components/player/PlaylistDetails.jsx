import React, { useEffect } from "react";

function PlaylistDetails({ playlistDetails, handleTrackClick }) {
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
        {playlistDetails.tracks.items.map((track, index) => (
          <span
            key={index}
            onClick={() => handleTrackClick(track)}
            style={{ cursor: "pointer" }}
          >
            <div style={{ display: "flex" }}>
              <img
                src={track.track.album.images[0].url}
                alt="Album Art"
                width={64}
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
