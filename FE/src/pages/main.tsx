import styles from "@/styles/MainPage.module.css";
import { ConcertSearchOption } from "@/types/concert";
import useConcertsQuery from "@/hooks/queries/concert/useConcertsQuery";
import ConcertCard from "@/components/concert/ConcertCard/ConcertCard";
import MainContent from "@/components/container/MainContent/MainContent";
import React, { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/router";
import useRecommendationSongsQuery from "@/hooks/queries/recommendation/useRecommendationSongsQuery";
import Image from "next/image";
import {
  PickTrackState,
  ListInfoState,
  reSongUrlState,
  reAlbumArtState,
  AlubumArtState,
  PickTrackUriState,
  MainplaylistState,
} from "@/store/atom";
import { useRecoilState } from "recoil";
import { Track } from "@/types/spotify";
import { Storage } from "@/utils/storage";

const initConcertSearchOption: ConcertSearchOption = {
  type: "genre",
  option: "Bal",
};

const MainPage = () => {
  const [username, setUsername] = useState<string>("");
  const { data: concerts } = useConcertsQuery(initConcertSearchOption);
  const router = useRouter();

  const onConcert = useCallback(() => {
    router.push("/concerts");
  }, []);

  const onPlayer = useCallback(() => {
    router.push("/player");
  }, []);

  const { data: recommendedSongs } = useRecommendationSongsQuery();
  const [resongUrl, setResongUrl] = useRecoilState(reSongUrlState);
  const [AlubumArt, setAlubumArt] = useRecoilState(AlubumArtState);
  const [PickTrack, setPickTrack] = useRecoilState(PickTrackState);
  const [ListInfo, setListInfo] = useRecoilState(ListInfoState);
  const [PickTrackUri, setPickTrackUri] = useRecoilState(PickTrackUriState);
  const [Mainplaylist, setMainplaylist] = useRecoilState(MainplaylistState);
  console.log("recommendedSongs", recommendedSongs);

  const handleSongClick = (song: Track) => {
    // 클릭된 곡의 URI를 PickTrackState에 저장
    console.log("song", song);
    // setPickTrack(song);
    setListInfo(song);
    setResongUrl(song.uri);
    setAlubumArt(song.album.images[0].uri);
  };

  useEffect(() => {
    setUsername(Storage.getUserName());
  }, []);

  return (
    // <div className={styles.body}>
    <div className={styles["main-page"]}>
      <MainContent
        className={styles["main-page__content"]}
        title={
          <p>
            {username && `${username}님을 위한 `}
            <span className="blue">공연</span>
          </p>
        }
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
      <MainContent
        className={styles["main-page__content"]}
        title={
          <p>
            {username && `${username}님을 위한 `}
            <span className="blue">추천곡</span>
          </p>
        }
        onClick={onPlayer}
      >
        <ul className={styles["main-page__content--item-container"]}>
          {recommendedSongs?.map((song) => (
            <li
              key={song.name}
              onClick={() => handleSongClick(song)}
              className={styles["main-page__content--item"]}
            >
              <div>
                <Image
                  src={song.album.images[0].uri}
                  alt={song.name}
                  width={100}
                  height={100}
                />
              </div>
            </li>
          ))}
        </ul>
      </MainContent>
    </div>
    // </div>
  );
};

export default MainPage;
