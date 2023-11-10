import {
  StompClientContext,
  StompContextState,
} from "@/contexts/StompClientContext";
import { useContext } from "react";

const useStompClient = () => {
  const stompContextState = useContext<StompContextState>(StompClientContext);
  return stompContextState;
};

export default useStompClient;
