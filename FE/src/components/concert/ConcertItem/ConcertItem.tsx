import Props from "@/types";
import styles from "./ConcertItem.module.css";
import { Concert } from "@/types/concert";
import { classNameWrapper } from "@/utils/className";
import { Time } from "@/utils/time";
import ConcertImage from "@/components/image/ConcertImage/ConcertImage";
import { useRouter } from "next/router";

interface ConcertItemProps extends Props {
  item: Concert;
  onClick?: (id: number) => void;
  type?: "list" | "small";
}

const ConcertItem = ({
  className,
  item,
  onClick,
  type = "list",
}: ConcertItemProps) => {
  const router = useRouter();
  const onConcertDetail = () => {
    if (onClick) {
      onClick(item.id);
    } else {
      router.push(`/concerts/${item.id}`);
    }
  };

  return (
    <li
      className={classNameWrapper(styles["concert-item"], className)}
      onClick={onConcertDetail}
    >
      <div className={styles["concert-item__image"]}>
        <ConcertImage src={item.imageUrl} alt={item.title} type={type} />
      </div>
      <div className={styles["concert-item__content"]}>
        <h1
          className={classNameWrapper(
            styles["concert-item__content-item"],
            styles["concert-item__content--title"]
          )}
        >
          {item.title}
        </h1>
        <p
          className={classNameWrapper(
            styles["concert-item__content-item"],
            styles["concert-item__content--place"]
          )}
        >
          {item.place}
        </p>
        <p
          className={classNameWrapper(
            styles["concert-item__content-item"],
            styles["concert-item__content--date"]
          )}
        >
          {Time.period(item.startDate, item.endDate)}
        </p>
      </div>
    </li>
  );
};

export default ConcertItem;
