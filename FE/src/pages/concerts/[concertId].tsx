import useConcertDetailQuery from "@/hooks/queries/concert/useConcertDetailQuery";
import { useParams } from "next/navigation";

const ConcertDetailPage = () => {
  const params = useParams();
  const concertId = Number(params?.concertId as string);
  const { data: concert } = useConcertDetailQuery(concertId);
  console.log(concert);

  return <div>{concert?.title}</div>;
};

export default ConcertDetailPage;
