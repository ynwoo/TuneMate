import { Storage } from "@/utils/storage";
import Dashboard from "../components/player/Dashboards";
import { useState, useEffect } from "react";
import styles from "@/styles/MainPage.module.css";

const MainPage = () => {
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    const spotifyAccessToken = Storage.getSpotifyAccessToken;
    setAccessToken(spotifyAccessToken);
  }, []);

  return (
    <div className={styles["main-page"]}>
      <Dashboard
        className={styles["main-page__item"]}
        accessToken={accessToken}
      />
    </div>
  );
};

export default MainPage;
