import React from "react";
import useRecommendationSongsQuery from "@/hooks/queries/recommendation/useRecommendationSongsQuery";
import Image from "next/image";

export default function SongRecommend() {
  const { data: recommendedSongs } = useRecommendationSongsQuery();

  return (
    <div>
      <h1>Recommended Songs</h1>
      <ul>
        {recommendedSongs?.map((song) => (
          <li key={song.title}>
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
