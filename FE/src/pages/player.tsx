import styles from "@/styles/PlayerPage.module.css";
import usePlayList from "@/hooks/usePlayList";
import Image from "next/image";
import { useState } from "react";

const Player = () => {
  const { currentTrack } = usePlayList();
  const [currentSlide, setCurrentSlide] = useState(1);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 1 ? 2 : 1));
  };

  return (
    <div className={styles["player-page"]}>
      {currentTrack && (
        <>
          <div className="slides">
            <div
              id="slide-1"
              className={`${styles["player-page__slide"]} ${
                currentSlide === 1 ? styles.activeSlide : ""
              }`}
            >
              <div style={{ height: "250px" }}>
                <div className={styles["player-page__image-container"]}>
                  <div className={styles["player-page__image"]}>
                    <Image
                      src={currentTrack.image}
                      alt={currentTrack.name}
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className={styles["player-page__rotate-image"]}></div>
                </div>
              </div>
            </div>
            <div
              id="slide-2"
              className={`${styles["player-page__slide"]} ${
                currentSlide === 2 ? styles.activeSlide : ""
              }`}
            >
              <div className={styles["AlbumAtr"]}>
                <Image
                  src={currentTrack.image}
                  alt={currentTrack.name}
                  width={240}
                  height={240}
                  className={styles["iimage"]}
                />
              </div>
            </div>
          </div>
          <button
            onClick={nextSlide}
            style={{
              backgroundColor: "transparent",
              border: "1px solid transparent",
            }}
          >
            <Image
              src="/arrow.png" // public 폴더의 이미지 경로
              alt="Arrow"
              width={25}
              height={25}
            />
          </button>
        </>
      )}
    </div>
  );
};

export default Player;
