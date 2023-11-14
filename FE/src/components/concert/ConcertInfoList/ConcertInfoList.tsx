import Props from "@/types";
import styles from "./ConcertInfoList.module.css";
import b_styles from "@/components/button/Button.module.css";
import { Concert } from "@/types/concert";
import { classNameWrapper } from "@/utils/className";
import ConcertInfoItem from "../ConcertInfoItem/ConcertInfoItem";
import { Time } from "@/utils/time";
import ConcertImage from "@/components/image/ConcertImage/ConcertImage";

interface ConcertInfoListProps extends Props {
  item: Concert;
}

const ConcertInfoList = ({ className, item }: ConcertInfoListProps) => {
  return (
    <ul className={classNameWrapper(styles["concert-info-list"], className)}>
      <ConcertInfoItem
        className={styles["concert-info-list__item"]}
        title="장소"
        description={item.place}
      />
      <ConcertInfoItem
        className={styles["concert-info-list__item"]}
        title="공연기간"
        description={Time.period(item.startDate, item.endDate)}
      />
      <a
        className={classNameWrapper(
          styles["concert-info-list__link"],
          b_styles["white"]
        )}
        href={item.link}
      >
        예약하러 가기
      </a>
    </ul>
  );
};

export default ConcertInfoList;
