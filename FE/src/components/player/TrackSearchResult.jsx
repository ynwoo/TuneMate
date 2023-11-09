// TrackSearchResult.js
import useCreateIndividualPlayListTrackMutation from "@/hooks/mutations/music/individual/useCreateIndividualPlayListTrackMutation";
import { useRouter } from "next/router";
import Image from "next/image";

export default function TrackSearchResult({ track, chooseTrack, playlistId }) {
  const { mutate: createIndividualPlayListTrack } =
    useCreateIndividualPlayListTrackMutation();

  function handlePlay() {
    console.log("track", track.uri);
    console.log("playlistId", playlistId);
    createIndividualPlayListTrack({
      playlistId: playlistId,
      uris: [track.uri],
      position: 0,
    });
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
      <Image src={track.albumUrl} width={64} height={64} alt="" />
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
      <button onClick={() => handlePlay(track)}>추가</button>
    </div>
  );
}
