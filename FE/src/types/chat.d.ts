import { User } from './user';

interface Chat {
  id: string;
  message: string;
  userId: User['userId'];
}

export type { Chat };
