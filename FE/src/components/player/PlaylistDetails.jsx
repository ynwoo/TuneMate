import React from "react";

function PlaylistDetails({ playlistDetails, playlistTracks }) {
  if (!playlistDetails) {
    return <div>상세 정보를 불러오는 중...</div>;
  }

  return (
    <div>
      <h2>플레이리스트 상세 정보</h2>
      <p>플레이리스트 이름: {playlistDetails.name}</p>
      <p>플레이리스트 소유자: {playlistDetails.owner.display_name}</p>

      <h3>곡 목록</h3>
      {/* <ul>
        {playlistTracks.map((track, index) => (
          <li key={index}>
            {track.track.name} - {track.track.artists[0].name}
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default PlaylistDetails;
