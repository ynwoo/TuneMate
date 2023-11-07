import { UserInfo } from "./user";

interface ChatRoom {
  chatRoomId: number;
  messages: Message[];
}

interface Message {
  type: "Message";
  senderName: string; // 보낸 사람 이름
  senderNo: number; // 보낸 사람의 기본키
  content: string; // 메세지 내용
  time: string;
  readCount: number; // 읽었는지 확인 0이면 모두 읽은 것
}

interface Chat {
  id: string;
  message: string;
  userId: UserInfo["userId"];
}

export type { Chat, ChatRoom, Message };
