interface SpotifyToken {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  refresh_token: string;
  scope: string;
}

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
  albums: Album;
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
  type: 'user';
  uri: string;
}

export type {
  SpotifyToken,
  UserProfile,
  Item,
  Owner,
  Album,
  Artist,
  Image,
  ChangeTrackIndex,
  Track,
};
