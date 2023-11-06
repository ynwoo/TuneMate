import BottomNavbar from "@/components/navbar/BottomNavbar/BottomNavbar";
import TopNavbar from "@/components/navbar/TopNavbar/TopNavbar";
import "@/styles/globals.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { usePathname } from "next/navigation";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2000,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/";
  console.log(isLoginPage);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        {!isLoginPage && <TopNavbar />}
        <div className={isLoginPage ? "login" : "main"}>
          <Component {...pageProps} />
        </div>
        {!isLoginPage && <BottomNavbar />}
      </QueryClientProvider>
    </RecoilRoot>
  );
}
