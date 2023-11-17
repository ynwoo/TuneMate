import Props from "@/types";
import styles from "./GroupCreate.module.css";
import { classNameWrapper } from "@/utils/className";
import Input from "@/components/input/Input/Input";
import { ChangeEvent, useCallback, useState, useEffect, useMemo } from "react";
import { GroupAnnouncement } from "@/types/group";
import TextArea from "@/components/input/TextArea/TextArea";
import Select from "@/components/input/Select/Select";
import { Concert, ConcertSearchOption, GenreOptions } from "@/types/concert";
import { concertSelectOptions, initConcertSearchOption } from "@/pages/concerts";
import useDebounce from "@/hooks/useDebounce";
import useConcertsQuery from "@/hooks/queries/concert/useConcertsQuery";
import Search from "@/components/input/Search/Search";
import ConcertList from "@/components/concert/ConcertList/ConcertList";
import ConcertItem from "@/components/concert/ConcertItem/ConcertItem";

interface GroupCreateProps extends Props {
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | number
  ) => void;
  group: GroupAnnouncement;
}

const GroupCreate = ({ className, onChange, group }: GroupCreateProps) => {
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

    const newConcerts = originalConcerts?.filter(({ title }) => title.includes(text));

    setConcerts(newConcerts);
  }, [originalConcerts, text]);

  const onInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setText(e.currentTarget.value);
    },
    [setText]
  );

  const onSelect = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setConcertSearchOption({
      ...concertSearchOption,
      option: e.currentTarget.value as GenreOptions,
    });
  }, []);

  const selectedConcert = useMemo(() => {
    return concerts?.find(({ id }) => id === group.concertId);
  }, [concerts, group.concertId]);

  useEffect(() => {
    onSubmit();
  }, [debounceText, originalConcerts]);

  return (
    <div className={classNameWrapper(styles["group-create"], className)}>
      <Input
        className={classNameWrapper(styles["group-create__item"])}
        label="제목"
        name="title"
        value={group.title}
        onChange={onChange}
      />
      <TextArea
        className={classNameWrapper(styles["group-create__item"], styles["group-create__content"])}
        label="내용"
        name="content"
        value={group.content}
        onChange={onChange}
      />
      <Input
        className={classNameWrapper(styles["group-create__item"])}
        label="정원"
        name="capacity"
        value={String(group.capacity)}
        onChange={onChange}
        type="number"
      />
      <Input
        className={classNameWrapper(styles["group-create__item"])}
        label="끝나는 날짜"
        name="deadline"
        value={group.deadline as string}
        onChange={onChange}
        type="date"
      />

      {selectedConcert && (
        <>
          <h1 className={styles["group-create__concert-item--title"]}>선택 공연</h1>
          <ConcertItem item={selectedConcert} />
        </>
      )}

      <div className={styles["group-create__search-container"]}>
        <Search
          className={styles["group-create__search"]}
          onInput={onInput}
          onSubmit={onSubmit}
          value={text}
          type="none"
        />
        <Select
          className={styles["group-create__select"]}
          items={concertSelectOptions}
          onChange={onSelect}
        />
      </div>
      {concerts && <ConcertList onClick={onChange} concerts={concerts} />}
    </div>
  );
};

export default GroupCreate;
