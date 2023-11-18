import Modal from "@/components/modal/Modal";
import styles from "./ConcertSearchModal.module.css";
import Search from "@/components/input/Search/Search";
import Select from "@/components/input/Select/Select";
import ConcertList from "../ConcertList/ConcertList";
import Props from "@/types";
import { Concert } from "@/types/concert";
import { ChangeEvent } from "react";
import { concertSelectOptions } from "@/pages/concerts";
import useModal from "@/hooks/useModal";

interface ConcertSearchModalProps extends Props {
  concerts: Concert[];
  text: string;
  onInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | number
  ) => void;
}

const ConcertSearchModal = ({
  concerts,
  onInput,
  onSelect,
  onSubmit,
  text,
  onChange,
}: ConcertSearchModalProps) => {
  const { isOpen, closeToggle } = useModal();

  return (
    <Modal
      className={styles["concert-search-modal-container"]}
      isOpen={isOpen}
      toggle={closeToggle}
    >
      <>
        <div className={styles["concert-search-modal__search-container"]}>
          <Search
            className={styles["concert-search-modal__search"]}
            onInput={onInput}
            onSubmit={onSubmit}
            value={text}
            type="none"
          />
          <Select
            className={styles["concert-search-modal__select"]}
            items={concertSelectOptions}
            onChange={onSelect}
          />
        </div>
        {concerts && (
          <ConcertList
            className={styles["concert-search-modal__concert-list"]}
            onClick={onChange}
            concerts={concerts}
            type="small"
          />
        )}
      </>
    </Modal>
  );
};

export default ConcertSearchModal;
