import styles from "@/styles/MainPage.module.css";
import { ConcertSearchOption } from "@/types/concert";
import useConcertsQuery from "@/hooks/queries/concert/useConcertsQuery";
import ConcertCard from "@/components/concert/ConcertCard/ConcertCard";
import MainContent from "@/components/container/MainContent/MainContent";
import { useCallback } from "react";
import { useRouter } from "next/router";
import React from "react";
import useRecommendationSongsQuery from "@/hooks/queries/recommendation/useRecommendationSongsQuery";
import Image from "next/image";
import {
  PickTrackState,
  ListInfoState,
  reSongUrlState,
  reAlbumArtState,
  AlubumArtState,
} from "@/store/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { Track } from "@/types/spotify";

const initConcertSearchOption: ConcertSearchOption = {
  type: "genre",
  option: "Bal",
};

const MainPage = () => {
  const { data: concerts } = useConcertsQuery(initConcertSearchOption);
  const router = useRouter();

  const onConcert = useCallback(() => {
    router.push("/concerts");
  }, []);

  const { data: recommendedSongs } = useRecommendationSongsQuery();
  const [resongUrl, setResongUrl] = useRecoilState(reSongUrlState);
  const [reAlbumArt, setReAlbumArt] = useRecoilState(reAlbumArtState);
  const [AlubumArt, setAlubumArt] = useRecoilState(AlubumArtState);
  // const ListInfo = useRecoilValue(ListInfoState);
  const [ListInfo, setListInfo] = useRecoilState(ListInfoState);
  console.log("recommendedSongs", recommendedSongs);

  const handleSongClick = (song: Track) => {
    // 클릭된 곡의 URI를 PickTrackState에 저장
    console.log("song", song);
    // setPickTrack(song);
    setListInfo(song);
    setResongUrl(song.uri);
    setAlubumArt(song.albums.images[0].url);
  };

  return (
    <div>
      <div className={styles["main-page"]}>
        <MainContent
          className={styles["main-page__content"]}
          title="공연"
          onClick={onConcert}
        >
          <ul className={styles["main-page__content--item-container"]}>
            {concerts?.map((concert) => (
              <ConcertCard
                className={styles["main-page__content--item"]}
                item={concert}
              />
            ))}
          </ul>
        </MainContent>
      </div>
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
                <Image
                  src={song.album.images[0].url}
                  alt={song.title}
                  width={100}
                  height={100}
                />
                <p>{song.name}</p>
                <p>{song.artists}</p>
                {/* <p>{song.uri}</p> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainPage;
