import { storage } from "@/utils/storage";
import Dashboard from "../components/player/Dashboards";

const mainPage = () => {
  const spotifyAccessToken = storage.getSpotifyAccessToken;

  return (
    <div>
      {/* <Dashboard /> */}
      <Dashboard accessToken={spotifyAccessToken} />;
    </div>
  );
};

export default mainPage;
