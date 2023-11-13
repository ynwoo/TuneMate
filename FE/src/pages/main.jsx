import React from "react";
import useRecommendationSongsQuery from "@/hooks/queries/recommendation/useRecommendationSongsQuery";
import Image from "next/image";
import {
  PickTrackState,
  ListInfoState,
  reSongUrlState,
  reAlbumArtState,
} from "@/store/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import SinglePlayer from "@/components/player/SinglePlayer";

export default function SongRecommend() {
  const { data: recommendedSongs } = useRecommendationSongsQuery();
  const [pickTrack, setPickTrack] = useRecoilState(PickTrackState);
  const [resongUrl, setResongUrl] = useRecoilState(reSongUrlState);
  const [reAlbumArt, setReAlbumArt] = useRecoilState(reAlbumArtState);
  // const ListInfo = useRecoilValue(ListInfoState);
  const [ListInfo, setListInfo] = useRecoilState(ListInfoState);

  const handleSongClick = (song) => {
    // 클릭된 곡의 URI를 PickTrackState에 저장
    console.log(song);
    // setPickTrack(song);
    setReAlbumArt(song.img);
    setListInfo(song.uri);
    setResongUrl(song.uri);
  };

  return (
    <div>
      <h1>Recommended Songs</h1>
      {/* <SinglePlayer /> */}
      <ul
        style={{
          display: "flex",
          overflowX: "auto",
          padding: 0,
          listStyle: "none",
        }}
      >
        {recommendedSongs?.map((song) => (
          <li
            key={song.title}
            onClick={() => handleSongClick(song)}
            style={{ marginRight: "10px" }}
          >
            <div>
              <Image src={song.img} alt={song.title} width={100} height={100} />
              <p>{song.title}</p>
              <p>{song.artist}</p>
              {/* <p>{song.uri}</p> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
