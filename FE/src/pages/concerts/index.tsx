import ConcertList from "@/components/concert/ConcertList/ConcertList";
import Search from "@/components/input/Search/Search";
import useConcertsQuery from "@/hooks/queries/concert/useConcertsQuery";
import useDebounce from "@/hooks/useDebounce";
import { Concert, ConcertSearchOption, GenreOptions } from "@/types/concert";
import { useState, useCallback, ChangeEvent, useEffect } from "react";
import styles from "@/styles/ConcertPage.module.css";
import Select from "@/components/input/Select/Select";

const initConcertSearchOption: ConcertSearchOption = {
  type: "genre",
  option: "Bal",
};

const selectOptions: { name: string; value: GenreOptions }[] = [
  { name: "발라드", value: "Bal" },
  { name: "락/메탈", value: "Roc" },
  { name: "랩/힙합", value: "Rap" },
  { name: "재즈/소울", value: "Jaz" },
  { name: "포크/트로트", value: "Por" },
  { name: "내한공연", value: "For" },
  { name: "페스티벌", value: "Fes" },
  { name: "인디", value: "Ind" },
];

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

  const onChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setConcertSearchOption({
      ...concertSearchOption,
      option: e.currentTarget.value as GenreOptions,
    });
  }, []);

  useEffect(() => {
    onSubmit();
  }, [debounceText, originalConcerts]);

  return (
    <div>
      <div className={styles["concerts-page__search-container"]}>
        <Search
          className={styles["concerts-page__search"]}
          onInput={onInput}
          onSubmit={onSubmit}
          value={text}
          type="none"
        />
        <Select
          className={styles["concerts-page__select"]}
          items={selectOptions}
          onChange={onChange}
        />
      </div>
      {concerts && <ConcertList concerts={concerts} />}
    </div>
  );
};

export default ConcertsPage;
