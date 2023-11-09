import { ChatRoom, MessageResponse } from "@/types/chat";

export const ChatFilter = Object.freeze({
  messages(messages: MessageResponse[]) {
    const newMessages = messages.reduce((newMessages, message) => {
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

    newMessages.sort();
    return newMessages;
  },

  chatRoom(chatRoom: ChatRoom): ChatRoom {
    return {
      chatRoomId: chatRoom.chatRoomId,
      messages: ChatFilter.messages(chatRoom.messages),
    };
  },
});
