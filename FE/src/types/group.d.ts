import { Concert } from "./concert";
import { UserInfo } from "./user";

interface GroupAnnouncement {
  title: string;
  capacity: number;
  concertId: Concert["id"];
  deadline: string | Date;
  content: string;
}

interface Group extends GroupAnnouncement {
  groupId: string;
  participantsCnt: number;
  hostId: UserInfo["userId"];
  hostName: UserInfo["name"];
  closedByHost: false;
  startDateTime: string;
  createdAt: string;
  lastModifiedAt: string;
}

interface GroupSearchOptions {
  hostName?: Group["hostName"];
  title?: Group["title"];
  content?: Group["content"];
  joinableOnly: boolean;
}

interface Participation {
  participationId: number;
  groupId: Group["groupId"];
  dateTime: string;
  imageUrl: string;
}

interface ParticipationRequest extends Participation {
  requesterId: UserInfo["userId"];
  requesterName: UserInfo["name"];
}

interface ParticipationResponse extends Participation {
  title: string;
  hostId: UserInfo["userId"];
  hostName: UserInfo["name"];
  concertId: Group["concertId"];
}

export type {
  Group,
  GroupAnnouncement,
  Participation,
  ParticipationRequest,
  ParticipationResponse,
  GroupSearchOptions,
};
