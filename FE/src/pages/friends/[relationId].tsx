import { getChats } from "@/api/social";
import useChat from "@/hooks/useChat";
import Props from "@/types";
import { ChatRoom } from "@/types/chat";
import { Friend } from "@/types/social";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<{
  chatroom: ChatRoom;
}> = async (context) => {
  const relationId = Number((context.params?.relationId as string) ?? 0);
  const chatroom = await getChats(relationId);

  return {
    props: {
      relationId,
      chatroom,
    },
  };
};

interface ChatPageProps extends Props {
  relationId: Friend["relationId"];
  chatroom: ChatRoom;
}

const ChatPage = ({ chatroom, relationId }: ChatPageProps) => {
  const { subscribe, publish } = useChat();

  return <div>chatPage</div>;
};

export default ChatPage;
