// TrackSearchResult.js
import Link from "next/link";
import { useRouter } from "next/router";

export default function TrackSearchResult({ track, chooseTrack }) {
  const router = useRouter();

  function handlePlay() {
    chooseTrack(track);
    handleAddToQueue(track);
    // router.push(`/album?albumUrl=${encodeURIComponent(track.albumUrl)}`);
  }

  function handleAddToQueue(track) {
    // 호출되면 선택한 트랙을 재생 목록에 추가
    // chooseTrack 함수를 통해 부모 컴포넌트로 전달된 것을 사용
    // 추가적인 로직이 필요할 수 있음
    chooseTrack(track);
    console.log("Add to queue:", track);
  }

  return (
    <div
      style={{
        cursor: "pointer",
        display: "flex",
        margin: 10,
        border: "1px solid white",
        backgroundColor: "#f7f4ff",
        height: "64px",
      }}
      onClick={handlePlay}
    >
      <img
        src={track.albumUrl}
        style={{ height: "64px", width: "64px" }}
        alt=""
      />
      <div
        style={{
          marginLeft: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: 16 }}>{track.title}</div>
        <div className="text-muted" style={{ fontSize: 12 }}>
          {track.artist}
        </div>
      </div>
      <button onClick={handleAddToQueue}>추가</button>
    </div>
  );
}
