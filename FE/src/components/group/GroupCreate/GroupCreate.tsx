import Props from "@/types";
import styles from "./GroupCreate.module.css";
import { classNameWrapper } from "@/utils/className";
import Input from "@/components/input/Input/Input";
import { ChangeEvent } from "react";
import { GroupAnnouncement } from "@/types/group";
import TextArea from "@/components/input/TextArea/TextArea";

interface GroupCreateProps extends Props {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  group: GroupAnnouncement;
}

const GroupCreate = ({ className, onChange, group }: GroupCreateProps) => {
  return (
    <div className={classNameWrapper(styles["group-create"], className)}>
      <Input
        className={classNameWrapper(styles["group-create__item"])}
        label="제목"
        name="title"
        value={group.title}
        onChange={onChange}
        autoFocus
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
        autoFocus
      />
      <Input
        className={classNameWrapper(styles["group-create__item"])}
        label="정원"
        name="capacity"
        value={String(group.capacity)}
        onChange={onChange}
        autoFocus
        type="number"
      />
      <Input
        className={classNameWrapper(styles["group-create__item"])}
        label="끝나는 날짜"
        name="deadline"
        value={group.deadline}
        onChange={onChange}
        autoFocus
        type="date"
      />
    </div>
  );
};

export default GroupCreate;
