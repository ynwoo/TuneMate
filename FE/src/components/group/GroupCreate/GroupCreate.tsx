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
import Button from "@/components/button/Button";
import Modal from "@/components/modal/Modal";
import useModal from "@/hooks/useModal";
import Icon from "@/components/icons";

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
  const { isOpen, closeToggle, openToggle } = useModal();

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

  const onClick = useCallback((id?: number) => {
    openToggle();
  }, []);

  const selectedConcert = useMemo(() => {
    return concerts?.find(({ id }) => id === group.concertId);
  }, [concerts, group.concertId]);

  useEffect(() => {
    onSubmit();
  }, [debounceText, originalConcerts]);

  return (
    <>
      <div className={classNameWrapper(styles["group-create"], className)}>
        <div className={styles["group-create__selected-concert"]}>
          {selectedConcert ? (
            <ConcertItem item={selectedConcert} onClick={onClick} />
          ) : (
            <>
              <h1 className={styles["group-create__empty-concert--title"]}>
                선택한 공연이 없습니다.
              </h1>
              <Button color="white" onClick={openToggle}>
                공연 선택
              </Button>
            </>
          )}
        </div>
        <Input
          className={classNameWrapper(styles["group-create__item"])}
          label="제목"
          name="title"
          value={group.title}
          onChange={onChange}
        />
        <TextArea
          className={classNameWrapper(
            styles["group-create__item"],
            styles["group-create__content"]
          )}
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
          label="마감일"
          name="deadline"
          value={group.deadline as string}
          onChange={onChange}
          type="date"
        />
      </div>
      <Modal
        className={styles["group-create-modal-container"]}
        isOpen={isOpen}
        toggle={closeToggle}
      >
        <>
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
          {concerts && (
            <ConcertList
              className={styles["group-create__concert-list"]}
              onClick={onChange}
              concerts={concerts}
              type="small"
            />
          )}
        </>
      </Modal>
    </>
  );
};

export default GroupCreate;
