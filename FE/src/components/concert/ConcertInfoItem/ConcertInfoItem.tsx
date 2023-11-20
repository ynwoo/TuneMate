import Props from "@/types";
import styles from "./ConcertInfoItem.module.css";
import { classNameWrapper } from "@/utils/className";

interface ConcertInfoItemProps extends Props {
  title: string;
  description: string | number;
  onClick?: () => void;
}

const ConcertInfoItem = ({
  className,
  title,
  description,
  onClick,
}: ConcertInfoItemProps) => {
  return (
    <li className={classNameWrapper(styles["concert-info-item"], className)}>
      <div className={styles["concert-info-item__title"]}>{title}</div>
      <p className={styles["concert-info-item__description"]} onClick={onClick}>
        {description}
      </p>
    </li>
  );
};

export default ConcertInfoItem;
