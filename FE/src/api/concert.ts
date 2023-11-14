import { Concert, ConcertSearchOption } from "@/types/concert";
import { api } from ".";

const GROUP_SERVICE = `group-service`;

// 공연 정보 목록 조회
export const getConcerts = async (
  concertSearchOption: ConcertSearchOption
): Promise<Concert[]> => {
  let searchOption = "";
  switch (concertSearchOption.type) {
    case "genre":
      searchOption = `genre=${concertSearchOption.option}`;
      break;
    case "playlistId":
      searchOption = `playlistId=${concertSearchOption.option}`;
      break;
    default:
      throw new Error("잘못된 search option");
  }
  const response = await api.get<Concert[]>(
    `${GROUP_SERVICE}/concert/concerts?${searchOption}`
  );
  return response.data;
};

// 공연 상세 정보
export const getConcertDetail = async (
  concertId: Concert["id"]
): Promise<Concert> => {
  const response = await api.get<Concert>(
    `${GROUP_SERVICE}/concert/${concertId}`
  );
  return response.data;
};
