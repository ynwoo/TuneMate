import Props from "@/types";
import styles from "./ConcertCard.module.css";
import { Concert } from "@/types/concert";
import { classNameWrapper } from "@/utils/className";
import ConcertImage from "@/components/image/ConcertImage/ConcertImage";
import { useCallback } from "react";
import { useRouter } from "next/router";

interface ConcertCardProps extends Props {
  item: Concert;
}

const ConcertCard = ({ className, item }: ConcertCardProps) => {
  const router = useRouter();

  const onConcert = useCallback(() => {
    router.push(`/concerts/${item.id}`);
  }, [item.id]);

  return (
    <li className={classNameWrapper(styles["concert-card"], className)}>
      <div className={styles["concert-card__image"]}>
        <ConcertImage
          src={item.imageUrl}
          alt={item.title}
          type="small"
          onClick={onConcert}
        />
      </div>
    </li>
  );
};

export default ConcertCard;
