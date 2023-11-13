export type SocketUrl = ChatSocketUrl | FriendSocketUrl;

export type ChatSocketUrl = ReadOnly<{
  brokerURL: () => string;
  subscribeURL: (relationId: Friend["relationId"]) => string;
  publishURL: () => string;
}>;

export type FriendSocketUrl = ReadOnly<{
  brokerURL: () => string;
  subscribeURL: (userId: Friend["friendId"]) => string;
  publishURL: (userId: Friend["userId"]) => string;
}>;
