import { Concert } from './concert';

interface Meeting {
  memo: string;
  concertId: Concert['concertId'];
  dateTime: string;
  relationId: number;
}

export type { Meeting };
