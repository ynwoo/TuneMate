import Props from "@/types";
import styles from "./ConcertList.module.css";
import { Concert } from "@/types/concert";
import { classNameWrapper } from "@/utils/className";
import ConcertItem from "../ConcertItem/ConcertItem";

interface ConcertListProps extends Props {
  concerts: Concert[];
  onClick?: (id: number) => void;
}

const ConcertList = ({ concerts, className, onClick }: ConcertListProps) => {
  return (
    <ul className={classNameWrapper(styles["concert-list"], className)}>
      {concerts.map((concert) => (
        <ConcertItem
          key={concert.id}
          item={concert}
          onClick={onClick}
          className={styles["concert-list__item"]}
        />
      ))}
    </ul>
  );
};

export default ConcertList;
