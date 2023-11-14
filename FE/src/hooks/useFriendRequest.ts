import { FriendRequestContext } from "@/contexts/FriendRequestContext";
import { useContext } from "react";

const useFriendRequest = () => {
  const context = useContext(FriendRequestContext);
  return context;
};

export default useFriendRequest;
