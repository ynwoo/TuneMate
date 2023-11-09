import { ChatRoom, MessageResponse } from "@/types/chat";

export const ChatFilter = Object.freeze({
  // content 없는 것과 중복 데이터 제외
  messages(messages: MessageResponse[]) {
    const newMessages = messages
      .filter(({ content }) => content)
      .reduce((newMessages, message) => {
        if (
          !newMessages.find(
            ({ senderNo, time }) =>
              message.senderNo === senderNo && message.time === time
          )
        ) {
          newMessages.push(message);
        }

        return newMessages;
      }, [] as MessageResponse[]);

    newMessages.sort((a, b) => (a.time < b.time ? -1 : 1));
    return newMessages;
  },

  chatRoom(chatRoom: ChatRoom): ChatRoom {
    return {
      chatRoomId: chatRoom.chatRoomId,
      messages: ChatFilter.messages(chatRoom.messages),
    };
  },
});
