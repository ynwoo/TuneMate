import { useContext } from "react";
import { ChatContext, ChatContextState } from "@/contexts/ChatContext";

const useChat = () => {
  const chatContextState = useContext<ChatContextState>(ChatContext);
  return chatContextState;
};

export default useChat;
