interface Concert {
  id: number;
  imageUrl: string;
  title: string;
  place: string;
  startDate: string;
  endDate: string;
  link: string;
}

type GenreOptions =
  | "Bal"
  | "Roc"
  | "Rap"
  | "Jaz"
  | "Por"
  | "Fes"
  | "Ind"
  | "For";

interface Genre {
  type: "genre";
  option: GenreOptions;
}

interface PlaylistId {
  type: "playlistId";
  option: string;
}

type ConcertSearchOption = Genre | PlaylistId;

export type { Concert, ConcertSearchOption, Genre, PlaylistId, GenreOptions };
