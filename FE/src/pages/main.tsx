import { storage } from "@/utils/storage";
import Dashboard from "../components/player/Dashboards";
import { useState, useEffect } from "react";

const MainPage = () => {
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    const spotifyAccessToken = storage.getSpotifyAccessToken;
    setAccessToken(spotifyAccessToken);
  }, []);

  return (
    <div>
      <Dashboard accessToken={accessToken} />;
    </div>
  );
};

export default MainPage;
