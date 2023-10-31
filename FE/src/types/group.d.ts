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
  hostId: number;
  hostName: string;
}

interface Participation {
  participationId: number;
  groupId: number;
  dateTime: string;
  imageUrl: string;
}

interface ParticipationRequest extends Participation {
  requesterId: number;
  requesterName: string;
}

interface ParticipationResponse extends Participation {
  title: string;
  hostId: number;
  hostName: string;
  concertId: number;
}

export type {
  Group,
  GroupAnnouncement,
  Participation,
  ParticipationRequest,
  ParticipationResponse,
};
