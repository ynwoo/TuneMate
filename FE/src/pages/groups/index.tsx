import GroupList from "@/components/group/GroupList/GroupList";
import useGroupsQuery from "@/hooks/queries/group/useGroupsQuery";
import { GroupSearchOptions } from "@/types/group";
import { useState, ChangeEvent, useEffect, useCallback, useRef } from "react";
import styles from "@/styles/GroupPage.module.css";
import Select from "@/components/input/Select/Select";
import Search from "@/components/input/Search/Search";
import useDebounce from "@/hooks/useDebounce";
import Button from "@/components/button/Button";
import { useRouter } from "next/router";

export const initGroupSearchOptions: GroupSearchOptions = {
  joinableOnly: true,
};

type OptionTypes = keyof GroupSearchOptions;

const selectOptions: { name: string; value: OptionTypes }[] = [
  { name: "호스트", value: "hostName" },
  { name: "제목", value: "title" },
  { name: "본문", value: "content" },
  //   { name: "참여가능여부", value: "joinableOnly" },
];

const GroupsPage = () => {
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<OptionTypes>("hostName");
  const [text, setText] = useState<string>("");
  const debounceText = useDebounce(text, 200);

  const [groupSearchOptions, setGroupSearchOptions] =
    useState<GroupSearchOptions>(initGroupSearchOptions);

  const { data: groups } = useGroupsQuery(groupSearchOptions);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const newType = e.currentTarget.value as OptionTypes;
      setText("");
      setType(newType);
    },
    [setType]
  );

  const onInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setText(e.currentTarget.value);
    },
    [setText]
  );

  const onSubmit = useCallback(() => {
    setGroupSearchOptions((groupSearchOptions) => ({
      joinableOnly: groupSearchOptions.joinableOnly,
      [type]: debounceText,
    }));
  }, [setGroupSearchOptions, type, debounceText]);

  const onCreate = () => {
    router.push(`/groups/create`);
  };

  // debounceText가 바뀌면 재 검색
  useEffect(() => {
    if (onSubmit) {
      onSubmit();
    }
  }, [onSubmit, debounceText]);

  // type이 바뀌면 input에 focus
  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchRef.current, type]);

  return (
    <div className={styles["groups-page"]}>
      <Button
        className={styles["groups-page__group--create"]}
        color="blue"
        onClick={onCreate}
      >
        공고 생성
      </Button>

      <div className={styles["groups-page__search-container"]}>
        <Search
          searchRef={searchRef}
          className={styles["groups-page__search"]}
          onInput={onInput}
          onSubmit={onSubmit}
          value={text}
          type="none"
        />
        <Select
          className={styles["groups-page__select"]}
          items={selectOptions}
          onChange={onChange}
        />
      </div>
      {groups && (
        <GroupList
          className={styles["groups-page__group-list"]}
          groups={groups}
        />
      )}
    </div>
  );
};

export default GroupsPage;
