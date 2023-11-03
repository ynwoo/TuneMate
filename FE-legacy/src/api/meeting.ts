import { Meeting } from '@/types/meeting';
import axios from 'axios';

const MEETING_URI = 'meeting/meetings';

// 만남 생성 기능
export const createMeeting = async (meeting: Meeting) => {
  await axios.post<void>(MEETING_URI, meeting);
};

// 만남 목록 조회
export const getMeetings = async (
  relationId: Meeting['relationId'],
): Promise<Meeting[]> => {
  const response = await axios.get<Meeting[]>(`${MEETING_URI}/${relationId}`);
  return response.data;
};

// 만남 삭제
export const deleteMeeting = async (relationId: Meeting['relationId']) => {
  await axios.delete<void>(`${MEETING_URI}/${relationId}`);
};

// 만남 상태 변경
export const updateMeetingState = async () => {
  await axios.put<void>(`meeting/states`);
};
