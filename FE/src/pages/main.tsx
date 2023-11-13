import styles from "@/styles/MainPage.module.css";
import { ConcertSearchOption } from "@/types/concert";
import useConcertsQuery from "@/hooks/queries/concert/useConcertsQuery";
import ConcertCard from "@/components/concert/ConcertCard/ConcertCard";
import MainContent from "@/components/container/MainContent/MainContent";
import { useCallback } from "react";
import { useRouter } from "next/router";

const initConcertSearchOption: ConcertSearchOption = {
  type: "genre",
  option: "Bal",
};

const MainPage = () => {
  const { data: concerts } = useConcertsQuery(initConcertSearchOption);
  const router = useRouter();

  const onConcert = useCallback(() => {
    router.push("/concerts");
  }, []);

  return (
    <div className={styles["main-page"]}>
      <MainContent title="공연" onClick={onConcert}>
        <ul className={styles["main-page__concert"]}>
          {concerts?.slice(0, 4).map((concert) => (
            <ConcertCard item={concert} />
          ))}
        </ul>
      </MainContent>
    </div>
  );
};

export default MainPage;
