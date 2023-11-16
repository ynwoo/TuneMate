import Props from "@/types";
import ChatProvider from "./ChatContext";
import FriendRequestProvider from "./FriendRequestContext";
import StompClientProvider from "./StompClientContext";
import PlayListProvider from "./PlayListContext";

const CustomContextProvider = ({ children }: Props) => {
  return (
    <StompClientProvider>
      <ChatProvider>
        <FriendRequestProvider>
          <PlayListProvider>{children}</PlayListProvider>
        </FriendRequestProvider>
      </ChatProvider>
    </StompClientProvider>
  );
};

export default CustomContextProvider;
