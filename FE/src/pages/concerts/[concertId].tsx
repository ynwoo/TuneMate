import useConcertDetailQuery from "@/hooks/queries/concert/useConcertDetailQuery";
import { classNameWrapper } from "@/utils/className";
import { useParams } from "next/navigation";
import styles from "@/styles/ConcertPage.module.css";
import ConcertImage from "@/components/image/ConcertImage/ConcertImage";
import Nothing from "@/components/nothing/Nothing/Nothing";
import ConcertInfoList from "@/components/concert/ConcertInfoList/ConcertInfoList";

const ConcertDetailPage = () => {
  const params = useParams();
  const concertId = Number(params?.concertId as string);
  const { data: concert } = useConcertDetailQuery(concertId);

  if (!concert) {
    return <Nothing></Nothing>;
  }

  return (
    <div className={classNameWrapper(styles["concert-detail-page"])}>
      <h1 className={styles["concert-detail-page__title"]}>{concert.title}</h1>
      <ConcertImage
        className={styles["concert-detail-page__image"]}
        src={concert.imageUrl}
        alt={concert.title}
        type="detail"
      />
      <ConcertInfoList className={styles["concert-detail-page__info"]} item={concert} />
    </div>
  );
};

export default ConcertDetailPage;
