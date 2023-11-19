import RequestsNabvar from "@/components/navbar/RequestsNavbar/RequestsNavbar";
import FriendRequestResults from "@/components/requests/FriendRequestResults/FriendRequestResults";
import FriendRequests from "@/components/requests/FriendRequests/FriendRequests";
import GroupRequests from "@/components/requests/GroupRequests/GroupRequests";
import useFriendRequest from "@/hooks/useFriendRequest";
import useGroupRequest from "@/hooks/useGroupRequest";
import { useMemo, useState } from "react";

export type RequestsState =
  | "friendRequests"
  | "friendRequestResults"
  | "groupRequests";
export interface OptionType {
  name: string;
  value: RequestsState;
  count?: number;
}

const RequestsPage = () => {
  const [state, setState] = useState<RequestsState>("friendRequests");
  const { unreadFriendRequestCount } = useFriendRequest();
  const { unreadGroupRequestCount } = useGroupRequest();

  const items: OptionType[] = [
    { name: "친구", value: "friendRequests", count: unreadFriendRequestCount },
    { name: "공고", value: "groupRequests", count: unreadGroupRequestCount },
    { name: "알림", value: "friendRequestResults" },
  ];

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
