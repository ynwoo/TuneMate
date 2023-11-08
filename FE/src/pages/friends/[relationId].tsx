import ChatList from "@/components/chat/ChatList/ChatList";
import useChatsQuery from "@/hooks/queries/social/useChatsQuery";
import useChat from "@/hooks/useChat";
import Props from "@/types";
import { ChatRoom, MessageRequest } from "@/types/chat";
import { useParams } from "next/navigation";
import { useEffect } from "react";

// const data = {
//   chatRoomId: 1,
//   messages: [
//     {
//       content:
//         "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos omnis quas sint accusamus et error perspiciatis sequi repudiandae, commodi fugiat blanditiis unde dolores culpa maiores, itaque iusto a ratione eaque! Ad, repudiandae totam, cum consequuntur facere maxime ab voluptates id, nam ipsa pariatur nobis explicabo perferendis doloribus molestiae et deleniti!",
//       readCount: 1,
//       relationId: 1,
//       senderName: "aa",
//       senderNo: 1,
//       time: "aa1",
//       type: "Message",
//     },
//     {
//       content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos",
//       readCount: 1,
//       relationId: 1,
//       senderName: "aa",
//       senderNo: 1,
//       time: "aa2",
//       type: "Message",
//     },
//     {
//       content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos",
//       readCount: 1,
//       relationId: 1,
//       senderName: "aa",
//       senderNo: 1,
//       time: "aa3",
//       type: "Message",
//     },
//   ],
// } as ChatRoom;

const messageRequest: MessageRequest = {
  content: "aa",
  relationId: 7,
  senderName: "aa",
  senderNo: "cb899bc8-33a9-43a6-938c-76b0ec286c77",
};

interface ChatPageProps extends Props {}

const ChatPage = ({}: ChatPageProps) => {
  const params = useParams();
  const relationId = Number(params?.relationId as string);
  console.log(relationId);

  const { subscribe, publish, chatRooms } = useChat();
  // const { data: ChatRoom } = useChatsQuery(relationId);
  console.log(chatRooms);

  return (
    <div>
      {/* <ChatList chatRoom={{}}} /> */}
      <button onClick={() => subscribe(relationId)}>subscribe</button>
      <button onClick={() => publish(messageRequest)}>publish</button>
    </div>
  );
};

export default ChatPage;
