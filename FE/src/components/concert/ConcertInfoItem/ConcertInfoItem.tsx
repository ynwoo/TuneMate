import Props from "@/types";
import styles from "./ConcertInfoItem.module.css";
import { classNameWrapper } from "@/utils/className";

interface ConcertInfoItemProps extends Props {
  title: string;
  description: string | number;
}

const ConcertInfoItem = ({
  className,
  title,
  description,
}: ConcertInfoItemProps) => {
  return (
    <li className={classNameWrapper(styles["concert-info-item"], className)}>
      <div className={styles["concert-info-item__title"]}>{title}</div>

      <p className={styles["concert-info-item__description"]}>{description}</p>
    </li>
  );
};

export default ConcertInfoItem;
