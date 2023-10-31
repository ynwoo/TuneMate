import { UserInfo } from './user';

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
  hostId: UserInfo['userId'];
  hostName: UserInfo['name'];
}

interface Participation {
  participationId: number;
  groupId: number;
  dateTime: string;
  imageUrl: string;
}

interface ParticipationRequest extends Participation {
  requesterId: UserInfo['userId'];
  requesterName: UserInfo['name'];
}

interface ParticipationResponse extends Participation {
  title: string;
  hostId: UserInfo['userId'];
  hostName: UserInfo['name'];
  concertId: number;
}

export type {
  Group,
  GroupAnnouncement,
  Participation,
  ParticipationRequest,
  ParticipationResponse,
};
