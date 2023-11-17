import Icon from "@/components/icons";
import ConcertImage from "@/components/image/ConcertImage/ConcertImage";
import useRecommendationSongsQuery from "@/hooks/queries/recommendation/useRecommendationSongsQuery";
import usePlayList from "@/hooks/usePlayList";
import styles from "@/styles/RecommendationPage.module.css";

const RecommendationTracksPage = () => {
  const { data: recommendationTracks } = useRecommendationSongsQuery();
  const { changePlayList } = usePlayList();

  return (
    <div>
      <ul className={styles["recommendation-tracks-page__track-list"]}>
        {recommendationTracks?.map((track) => (
          <li className={styles["recommendation-tracks-page__track-item"]}>
            <ConcertImage src={track.album.images[0].url} alt={track.name} type="small" />
            <div className={styles["recommendation-tracks-page__track-item--content"]}>
              <p className={styles["recommendation-tracks-page__track-item--content-title"]}>
                {track.name}
              </p>
              <p className={styles["recommendation-tracks-page__track-item--content-name"]}>
                {track.artists.join(", ")}
              </p>
            </div>
            <div
              className={styles["recommendation-tracks-page__track-item--play-container"]}
              onClick={() => changePlayList(track)}
            >
              <Icon.PlayMusic className={styles["recommendation-tracks-page__track-item--play"]} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationTracksPage;
