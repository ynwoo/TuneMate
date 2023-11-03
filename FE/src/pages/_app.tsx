import BottomNavbar from "@/components/navbar/BottomNavbar/BottomNavbar";
import TopNavbar from "@/components/navbar/TopNavbar/TopNavbar";
import "@/styles/globals.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2000,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <TopNavbar />
        <div className="main">
          <Component {...pageProps} />
        </div>
        <BottomNavbar />
      </QueryClientProvider>
    </RecoilRoot>
  );
}
