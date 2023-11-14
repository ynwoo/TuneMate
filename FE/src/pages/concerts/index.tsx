import ConcertList from "@/components/concert/ConcertList/ConcertList";
import Search from "@/components/input/Search/Search";
import useConcertsQuery from "@/hooks/queries/concert/useConcertsQuery";
import useDebounce from "@/hooks/useDebounce";
import { Concert, ConcertSearchOption } from "@/types/concert";
import { useState, useCallback, ChangeEvent, useEffect } from "react";
import styles from "@/styles/ConcertPage.module.css";

const initConcertSearchOption: ConcertSearchOption = {
  type: "genre",
  option: "Bal",
};

const ConcertsPage = () => {
  const [concertSearchOption, setConcertSearchOption] =
    useState<ConcertSearchOption>(initConcertSearchOption);
  const [text, setText] = useState<string>("");
  const debounceText = useDebounce(text, 200);
  const [concerts, setConcerts] = useState<Concert[] | undefined>();

  const { data: originalConcerts } = useConcertsQuery(concertSearchOption);

  const onSubmit = useCallback(() => {
    if (!text) {
      setConcerts(originalConcerts);
      return;
    }

    const newConcerts = originalConcerts?.filter(({ title }) =>
      title.includes(text)
    );

    setConcerts(newConcerts);
  }, [originalConcerts, text]);

  const onInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setText(e.currentTarget.value);
    },
    [setText]
  );

  useEffect(() => {
    onSubmit();
  }, [debounceText, originalConcerts]);

  return (
    <div>
      <Search
        className={styles["concerts-page__search"]}
        onInput={onInput}
        onSubmit={onSubmit}
        value={text}
        type="none"
      />
      {concerts && <ConcertList concerts={concerts} />}
    </div>
  );
};

export default ConcertsPage;
