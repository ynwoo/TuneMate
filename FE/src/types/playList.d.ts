import { Friend } from "./social";
import { Image, Item, Owner } from "./spotify";

interface PlayList {
  description: string;
  id: string;
  images: Image[];
  name: string;
  snapshot_id: string;
  tracks: {
    items: any[];
  };
}

interface PlayListDetail extends PlayList {
  collaborative: boolean;
  external_urls: {
    [key: string]: string;
  };
  href: string;
  owner: Owner;
  primary_color: string | null;
  public: boolean;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
}

interface NewPlayList {
  name: string;
  description: string;
  open: boolean;
}

interface NewCommonPlayList extends NewPlayList {
  relationId: Friend["relationId"];
}

// interface TotalPlayList {
//   href: string;
//   items: PlayListDetail[];
//   limit: number;
//   next: string | null;
//   offset: number;
//   previous: string | null;
//   total: number;
// }

export type {
  PlayList,
  NewPlayList,
  PlayListDetail,
  TotalPlayList,
  NewCommonPlayList,
};
