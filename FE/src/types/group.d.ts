import { User } from './user';

interface GroupAnnouncement {
  title: string;
  capacity: number;
  concertId: number;
  deadline: string;
  content: string;
}

interface Group extends GroupAnnouncement {
  groupId: number;
  participantsCnt: number;
  startDateTime: string;
  hostId: User['userId'];
  hostName: User['name'];
}

interface Participation {
  participationId: number;
  groupId: number;
  dateTime: string;
  imageUrl: string;
}

interface ParticipationRequest extends Participation {
  requesterId: User['userId'];
  requesterName: User['name'];
}

interface ParticipationResponse extends Participation {
  title: string;
  hostId: User['userId'];
  hostName: User['name'];
  concertId: number;
}

export type {
  Group,
  GroupAnnouncement,
  Participation,
  ParticipationRequest,
  ParticipationResponse,
};
