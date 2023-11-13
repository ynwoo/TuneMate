import Props from "@/types";
import styles from "./ConcertCard.module.css";
import { Concert } from "@/types/concert";
import { classNameWrapper } from "@/utils/className";
import ConcertImage from "@/components/image/ConcertImage/ConcertImage";

interface ConcertCardProps extends Props {
  item: Concert;
}

const ConcertCard = ({ className, item }: ConcertCardProps) => {
  return (
    <li className={classNameWrapper(styles["concert-card"], className)}>
      <div className={styles["concert-card__image"]}>
        <ConcertImage src={item.imageUrl} alt={item.title} />
      </div>
    </li>
  );
};

export default ConcertCard;
