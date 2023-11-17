import styles from "@/styles/MainPage.module.css";
import { ConcertSearchOption } from "@/types/concert";
import useConcertsQuery from "@/hooks/queries/concert/useConcertsQuery";
import ConcertCard from "@/components/concert/ConcertCard/ConcertCard";
import MainContent from "@/components/container/MainContent/MainContent";
import React, { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/router";
import useRecommendationSongsQuery from "@/hooks/queries/recommendation/useRecommendationSongsQuery";
import { Storage } from "@/utils/storage";
import ConcertImage from "@/components/image/ConcertImage/ConcertImage";
import usePlayList from "@/hooks/usePlayList";
import useIndividualPlayListRepresentativeQuery from "@/hooks/queries/music/individual/useIndividualPlayListRepresentativeQuery";
import useSocialFriendsQuery from "@/hooks/queries/social/useSocialFriendsQuery";
import FriendPlayList from "@/components/friend/FriendPlayList/FriendPlayList";
import { Friend } from "@/types/social";

const initConcertSearchOption: ConcertSearchOption = {
  type: "genre",
  option: "Bal",
};

const MainPage = () => {
  const [username, setUsername] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const { data: concerts } = useConcertsQuery(initConcertSearchOption);
  const { data: tracks } = useRecommendationSongsQuery();
  const { data: individualPlayList } = useIndividualPlayListRepresentativeQuery();
  const { data: socialFriends } = useSocialFriendsQuery();
  const { changePlayList } = usePlayList();
  const router = useRouter();

  const onConcert = useCallback(() => {
    router.push("/concerts");
  }, []);

  const onPlayer = useCallback(() => {
    router.push("/player");
  }, []);

  const onProfile = useCallback(() => {
    if (!userId) return;
    router.push(`profile/${userId}`);
  }, [userId]);

  const onFriendProfile = useCallback((friendId: Friend["userId"]) => {
    router.push(`profile/${friendId}`);
  }, []);

  useEffect(() => {
    setUsername(Storage.getUserName());
    setUserId(Storage.getUserId());
  }, []);

  return (
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
            <ConcertCard className={styles["main-page__content--item"]} item={concert} />
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
          {tracks?.map((track) => (
            <li key={track.uri} className={styles["main-page__content--item"]}>
              <ConcertImage
                src={track.album.images[0].url}
                alt={track.name}
                type="list"
                onClick={() => changePlayList(track)}
              />
            </li>
          ))}
        </ul>
      </MainContent>
      <MainContent
        className={styles["main-page__content"]}
        title={
          <p>
            {username && `${username}님의 `}
            <span className="blue">플레이리스트</span>
          </p>
        }
        onClick={onProfile}
      >
        <ul className={styles["main-page__content--item-container"]}>
          {individualPlayList?.tracks.items?.map(({ track }) => (
            <li key={track.uri} className={styles["main-page__content--item"]}>
              <ConcertImage
                src={track.album.images[0].url}
                alt={track.name}
                type="list"
                onClick={() => changePlayList(track)}
              />
            </li>
          ))}
        </ul>
      </MainContent>
      {socialFriends?.map(({ friendPlaylistId, name, friendId }) => (
        <MainContent
          className={styles["main-page__content"]}
          title={
            <p>
              {name && `${name}님의 `}
              <span className="blue">플레이리스트</span>
            </p>
          }
          onClick={() => onFriendProfile(friendId)}
        >
          <FriendPlayList
            className={styles["main-page__content--item-container"]}
            playListId={friendPlaylistId}
          />
        </MainContent>
      ))}
    </div>
  );
};

export default MainPage;
