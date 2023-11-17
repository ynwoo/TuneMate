import BottomNavbar from "@/components/navbar/BottomNavbar/BottomNavbar";
import TopNavbar from "@/components/navbar/TopNavbar/TopNavbar";
import "@/styles/globals.css";
import "@/styles/reset.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { RecoilRoot } from "recoil";
import CustomContextProvider from "@/contexts/CustomContextProvider";
import Player from "@/components/player/Player/Player";
import { classNameWrapper } from "@/utils/className";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 20_000,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();

  const hasNavbar = useMemo(() => {
    if (!pathname) return false;

    // login-page
    if (pathname === "/") {
      return true;
    }

    const pathList = pathname.split("/");

    // chat-page
    if (pathList[1] === "friends" && !isNaN(Number(pathList[2])) && pathList[3] !== "playlist") {
      return true;
    }

    return false;
  }, [pathname]);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <CustomContextProvider>
          <>
            {!hasNavbar && <TopNavbar />}
            <div className={hasNavbar ? "login" : "main"}>
              <Component {...pageProps} />
            </div>
            <BottomNavbar className={classNameWrapper(hasNavbar && "disabled")} />
          </>
        </CustomContextProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
