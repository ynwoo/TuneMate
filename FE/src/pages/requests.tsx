import RequestsNabvar from "@/components/navbar/RequestsNavbar/RequestsNavbar";
import FriendRequestResults from "@/components/requests/FriendRequestResults/FriendRequestResults";
import FriendRequests from "@/components/requests/FriendRequests/FriendRequests";
import GroupRequests from "@/components/requests/GroupRequests/GroupRequests";
import { useMemo, useState } from "react";

export type RequestsState = "friendRequests" | "friendRequestResults" | "groupRequests";
export interface OptionType {
  name: string;
  value: RequestsState;
}
const items: OptionType[] = [
  { name: "친구", value: "friendRequests" },
  { name: "공고", value: "groupRequests" },
  { name: "알림", value: "friendRequestResults" },
];

const RequestsPage = () => {
  const [state, setState] = useState<RequestsState>("friendRequests");

  const onSelect = (value: RequestsState) => {
    setState(value as RequestsState);
  };

  const Requests = useMemo(() => {
    switch (state) {
      case "friendRequests":
        return FriendRequests;
      case "friendRequestResults":
        return FriendRequestResults;
      case "groupRequests":
        return GroupRequests;
      default:
        return FriendRequests;
    }
  }, [state]);
  return (
    <div>
      <RequestsNabvar items={items} onSelect={onSelect} />
      <Requests />
    </div>
  );
};

export default RequestsPage;
