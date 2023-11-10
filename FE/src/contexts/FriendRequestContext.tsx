import Props from "@/types";
import { createContext } from "react";

export interface FriendRequestContextState {}

export const FriendRequestContext = createContext<FriendRequestContextState>(
  {} as FriendRequestContextState
);

const FriendRequestProvider = ({ children }: Props) => {
  return (
    <FriendRequestContext.Provider>{children}</FriendRequestContext.Provider>
  );
};

export default FriendRequestProvider;
