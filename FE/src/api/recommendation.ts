import axios from 'axios';
import { RecommendationFriend } from '@/types/social';
import { Song } from '@/types/spotify';

const RECOMMENDATION_URL = 'recommendation-service/recommendation';

// 노래 추천 목록 조회
export const getRecommendationSongs = async (): Promise<Song[]> => {
  const response = await axios.get<Song[]>(`${RECOMMENDATION_URL}/songs`);
  return response.data;
};

// 추천 친구 목록 조회
export const getRecommendationFriends = async (): Promise<
  RecommendationFriend[]
> => {
  try {
    const response = await axios.get<RecommendationFriend[]>(
      `${RECOMMENDATION_URL}/friends`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    console.error(
      '추천 친구 목록 조회에 실패하였습니다. - 대표 플레이 리스트에 10곡 이상 담아주세요!!',
    );
    return [];
  }
};
