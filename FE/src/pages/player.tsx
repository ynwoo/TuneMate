import styles from "@/styles/PlayerPage.module.css";
import usePlayList from "@/hooks/usePlayList";
import Image from "next/image";

const Player = () => {
  const { currentTrack } = usePlayList();
  return (
    <div className={styles["player-page"]}>
      {currentTrack && (
        <>
          <div className={styles["player-page__image-container"]}>
            <div className={styles["player-page__image"]}>
              <Image src={currentTrack.image} alt={currentTrack.name} width={100} height={100} />
            </div>
            <div className={styles["player-page__rotate-image"]}></div>
            <div className={styles["player-page__rotate-image--small"]}>
              <Image src={currentTrack.image} alt={currentTrack.name} width={100} height={100} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Player;
