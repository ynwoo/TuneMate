interface Concert {
  imageUrl: string;
  title: string;
  place: string;
  startDate: string;
  endDate: string;
  link: string;
}

interface Genre {
  type: 'genre';
  option: 'Bal' | 'Roc' | 'Rap' | 'Jaz' | 'Por' | 'Fes' | 'Ind';
}

interface PlaylistId {
  type: 'playlistId';
  option: string;
}

type ConcertSearchOption = Genre | PlaylistId;

export type { Concert, ConcertSearchOption };
