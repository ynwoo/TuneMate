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
  PickTrackUriState,
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
  const [AlubumArt, setAlubumArt] = useRecoilState(AlubumArtState);
  const [PickTrack, setPickTrack] = useRecoilState(PickTrackState);
  const [ListInfo, setListInfo] = useRecoilState(ListInfoState);
  const [PickTrackUri, setPickTrackUri] = useRecoilState(PickTrackUriState);
  console.log("recommendedSongs", recommendedSongs);

  const handleSongClick = (song: Track) => {
    // 클릭된 곡의 URI를 PickTrackState에 저장
    console.log("song", song);
    // setPickTrack(song);
    setListInfo(song);
    setPickTrack(song);
    setPickTrackUri(song.uri);
    setAlubumArt(song.album.images[0].uri);

    console.log("ListInfo", ListInfo.album.images[0].url);
    console.log("AlubumArt", AlubumArt);
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
              key={song.name}
              onClick={() => handleSongClick(song)}
              style={{ marginRight: "10px" }}
            >
              <div>
                <Image
                  src={song.album.images[0].uri}
                  alt={song.name}
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
