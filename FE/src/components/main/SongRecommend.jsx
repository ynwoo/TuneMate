import React, { useState, useEffect } from "react";
import axios from "axios";
import useRecommendationSongsQuery from "@/hooks/queries/recommendation/useRecommendationSongsQuery";
import Image from "next/image";
import SinglePlayer from "../player/SinglePlayer";
import Player from "../player/Player";
import { AccessTokenState } from "@/store/atom";
import { useRecoilValue } from "recoil";

export default function SongRecommend() {
  const { data: Songs } = useRecommendationSongsQuery();
  const accessToken = useRecoilValue(AccessTokenState);

  // useEffect(() => {
  //   const spotifyAccessToken = Storage.getSpotifyAccessToken;
  //   setAccessToken(spotifyAccessToken);
  // }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {Songs?.map((song) => (
        <li key={song.title}>
          <div>
            <Image src={song.img} alt={song.title} width={100} height={100} />
            <p>{song.title}</p>
            <p>{song.artist}</p>
            <SinglePlayer />
            <Player accessToken={accessToken} playTrack={song.uri} />
          </div>
        </li>
      ))}
    </div>
  );
}
