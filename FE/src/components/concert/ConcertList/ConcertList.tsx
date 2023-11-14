import Props from "@/types";
import styles from "./ConcertList.module.css";
import { Concert } from "@/types/concert";
import { classNameWrapper } from "@/utils/className";
import ConcertItem from "../ConcertItem/ConcertItem";

interface ConcertListProps extends Props {
  concerts: Concert[];
}

const ConcertList = ({ concerts, className }: ConcertListProps) => {
  return (
    <ul className={classNameWrapper(styles["concert-list"], className)}>
      {concerts.map((concert) => (
        <ConcertItem
          key={concert.id}
          item={concert}
          className={styles["concert-list__item"]}
        />
      ))}
    </ul>
  );
};

export default ConcertList;
