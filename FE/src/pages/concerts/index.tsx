import ConcertList from "@/components/concert/ConcertList/ConcertList";
import useConcertsQuery from "@/hooks/queries/concert/useConcertsQuery";
import { ConcertSearchOption } from "@/types/concert";
import { useState } from "react";

const initConcertSearchOption: ConcertSearchOption = {
  type: "genre",
  option: "Bal",
};

const ConcertsPage = () => {
  const [concertSearchOption, setConcertSearchOption] =
    useState<ConcertSearchOption>(initConcertSearchOption);

  const { data: concerts } = useConcertsQuery(concertSearchOption);

  return (
    <div>
      {/* <Button color="blue" onClick={()=>{}}></Button> */}
      {concerts && <ConcertList concerts={concerts} />}
    </div>
  );
};

export default ConcertsPage;
