import { UserInfo } from './user';

interface Chat {
  id: string;
  message: string;
  userId: UserInfo['userId'];
}

export type { Chat };
