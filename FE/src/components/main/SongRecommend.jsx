import React from "react";
import useRecommendationSongsQuery from "@/hooks/queries/recommendation/useRecommendationSongsQuery";
import Image from "next/image";
import { ListInfoState } from "@/store/atom";
import { useRecoilState, useRecoilValue } from "recoil";

export default function SongRecommend() {
  const { data: recommendedSongs } = useRecommendationSongsQuery();
  const [ListInfo, setLiseInfo] = useRecoilState(ListInfoState);
  // const ListInfoInfo = useRecoilValue(ListInfoState);

  const handleSongClick = (song) => {
    // 클릭된 곡의 URI를 PickTrackState에 저장
    setLiseInfo(song);
    console.log("song", song);
    console.log("recommendedSongs", recommendedSongs);
  };

  return (
    <div>
      <h1>Recommended Songs</h1>
      <ul>
        {recommendedSongs?.map((song) => (
          <li key={song.title} onClick={() => handleSongClick(song)}>
            <div>
              <Image src={song.img} alt={song.title} width={100} height={100} />
              <p>{song.title}</p>
              <p>{song.artist}</p>
              <p>{song.uri}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
