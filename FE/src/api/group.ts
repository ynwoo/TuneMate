import {
  Group,
  GroupAnnouncement,
  GroupSearchOptions,
  Participation,
  ParticipationRequest,
  ParticipationResponse,
} from "@/types/group";
import { api } from ".";

const GROUP_SERVICE_URL = "group-service";
const GROUPS_URL = `${GROUP_SERVICE_URL}/groups`;

// 모집 공고 생성
export const createGroup = async (groupAnnouncement: GroupAnnouncement) => {
  await api.post<void>(GROUPS_URL, groupAnnouncement);
};

// 모집 공고 목록 조회
export const getGroups = async (
  groupSearchOptions: GroupSearchOptions
): Promise<Group[]> => {
  const keys = Object.keys(groupSearchOptions) as (keyof GroupSearchOptions)[];
  const queryParams = keys
    .map((key) => `${key}=${groupSearchOptions[key]}`)
    .join("&");

  const response = await api.get<Group[]>(`${GROUPS_URL}?${queryParams}`);
  return response.data;
};

// 모집 공고 수정
export const updateGroup = async ({
  groupId,
  groupAnnouncement,
}: {
  groupId: Group["groupId"];
  groupAnnouncement: GroupAnnouncement;
}) => {
  await api.put<void>(`${GROUPS_URL}`, { ...groupAnnouncement, groupId });
};

// 모집 공고 삭제
export const deleteGroup = async (groupId: Group["groupId"]) => {
  await api.delete<void>(`${GROUPS_URL}/${groupId}`);
};

// 모집 공고 마감
export const deadlineGroup = async (groupId: Group["groupId"]) => {
  await api.patch<void>(`${GROUPS_URL}/${groupId}`);
};

// 모집 공고 조회
export const getGroup = async (groupId: Group["groupId"]): Promise<Group> => {
  const response = await api.get<Group>(`${GROUPS_URL}/${groupId}`);
  return response.data;
};

// 참여 요청
export const participateGroup = async (groupId: Group["groupId"]) => {
  await api.post<void>(`${GROUPS_URL}/${groupId}/participation-requests`);
};

// 받은 참여 요청 조회
export const getGroupReceivedParticipations = async (): Promise<
  ParticipationRequest[]
> => {
  const response = await api.get<ParticipationRequest[]>(
    `${GROUP_SERVICE_URL}/me/received-participation-requests`
  );
  return response.data;
};

// 보낸 참여 요쳥 목록 조회
export const getGroupSentParticipations = async (): Promise<
  ParticipationResponse[]
> => {
  const response = await api.get<ParticipationResponse[]>(
    `${GROUP_SERVICE_URL}/me/sent-participation-requests`
  );
  return response.data;
};

// 참여 요청 수락
export const acceptGroupParticipation = async (
  participationId: Participation["participationId"]
) => {
  await api.post(
    `${GROUP_SERVICE_URL}/group-participation-requests/${participationId}`
  );
};

// 참여 요청 거절
export const rejectGroupParticipation = async (
  participationId: Participation["participationId"]
) => {
  await api.delete(
    `${GROUP_SERVICE_URL}/group-participation-requests/${participationId}`
  );
};

// 참여중인 공고 조회
export const getMyGroups = async (): Promise<Group[]> => {
  const response = await api.get<Group[]>(
    `${GROUP_SERVICE_URL}/me/group-participations`
  );
  return response.data;
};

// 참여중인 공고 탈퇴
export const leaveMyGroup = async (groupId: Group["groupId"]) => {
  await api.post<void>(
    `${GROUP_SERVICE_URL}/me/group-participations/${groupId}`
  );
};
