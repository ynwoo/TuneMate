import ConcertItem from "@/components/concert/ConcertItem/ConcertItem";
import useConcertDetailQuery from "@/hooks/queries/concert/useConcertDetailQuery";
import useGroupQuery from "@/hooks/queries/group/useGroupQuery";
import { useParams } from "next/navigation";

const GroupDetail = () => {
  const params = useParams();
  const groupId = params.groupId as string;
  const { data: group } = useGroupQuery(groupId);
  const { data: concert } = useConcertDetailQuery(group?.concertId ?? 0);
  return (
    <div>
      {group && (
        <>
          <h1>{group.title}</h1>
          {concert && <ConcertItem item={concert} />}
          <h1>{group.title}</h1>
        </>
      )}
    </div>
  );
};

export default GroupDetail;
