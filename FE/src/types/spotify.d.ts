interface UserProfile {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
}

interface Item {
  track: Track;
}

interface Track {
  album: Album;
  uri: string;
}

interface Album {
  images: Image[];
}

interface ChangeTrackIndex {
  range_start: number;
  insert_before: number;
  range_length: number;
}

interface Artist {
  name: string;
}

interface Image {
  url: string;
  height: number;
  width: number;
}

interface Owner {
  display_name: string;
  external_urls: {
    [key: string]: string;
  };
  href: string;
  id: string;
  type: "user";
  uri: string;
}

interface AddTrack {
  playlistId: PlayList["id"];
  uris: string[];
  position: number;
}
interface DeleteTrack {
  playlistId: PlayList["id"];
  uri: string;
  positions: number[];
}

interface ChangeTrack {
  playlistId: PlayList["id"];
  changeTrackIndex: ChangeTrackIndex;
}

interface Song {
  title: string;
  img: string;
  artist: string;
  uri: string;
}

export type {
  UserProfile,
  Item,
  Owner,
  Album,
  Artist,
  Image,
  ChangeTrackIndex,
  Track,
  AddTrack,
  DeleteTrack,
  ChangeTrack,
  Song,
};
