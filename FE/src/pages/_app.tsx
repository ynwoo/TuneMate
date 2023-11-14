import BottomNavbar from "@/components/navbar/BottomNavbar/BottomNavbar";
import TopNavbar from "@/components/navbar/TopNavbar/TopNavbar";
import ChatProvider from "@/contexts/ChatContext";
import FriendRequestProvider from "@/contexts/FriendRequestContext";
import StompClientProvider from "@/contexts/StompClientContext";
import "@/styles/globals.css";
import "@/styles/reset.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { RecoilRoot } from "recoil";
import SinglePlayer from "@/components/player/SinglePlayer";
import Dashboard from "@/components/player/Dashboards";
import { Storage } from "@/utils/storage";
import styles from "@/styles/MainPage.module.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 20_000,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    const spotifyAccessToken = Storage.getSpotifyAccessToken;
    setAccessToken(spotifyAccessToken);
  }, []);

  const pathname = usePathname();

  const hasNavbar = useMemo(() => {
    if (!pathname) return false;

    // login-page
    if (pathname === "/") {
      return true;
    }

    const pathList = pathname.split("/");

    // chat-page
    if (pathList[1] === "friends" && !isNaN(Number(pathList[2]))) {
      return true;
    }

    return false;
  }, [pathname]);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <StompClientProvider>
          <ChatProvider>
            <FriendRequestProvider>
              <>
                {!hasNavbar && <TopNavbar />}
                <div className={hasNavbar ? "login" : "main"}>
                  <SinglePlayer />

                  <Component {...pageProps} />
                </div>
                {!hasNavbar && <BottomNavbar />}
              </>
            </FriendRequestProvider>
          </ChatProvider>
        </StompClientProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
