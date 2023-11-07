import Link from "next/link";

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track);
  }

  return (
    <Link
      href="/track/[trackId]" // 동적 경로 정의 (파일명 [trackId].js와 일치해야 함)
      as={`/track/${encodeURIComponent(track.uri)}`} // URI를 encodeURIComponent로 둘러싸기
    >
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
      </div>
    </Link>
  );
}
