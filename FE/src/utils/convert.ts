import { PlayList } from "@/types/playList";
import { Track, TrackInfo } from "@/types/spotify";

export const Convert = Object.freeze({
  trackToTrackInfo: (track: Track, index?: number): TrackInfo => {
    return {
      title: track.name,
      artist: track.artists.map(({ name }) => name).join(", "),
      cover: track.album.images[0].url as string,
      id: track.id,
      uri: track.uri,
      index,
    };
  },

  playListToTrackInfos: (playList: PlayList): TrackInfo[] => {
    const {
      tracks: { items },
    } = playList;

    return items.map(({ track }, index) => Convert.trackToTrackInfo(track, index));
  },

  trackToPlayList: (track: Track) => {
    const playList: PlayList = {
      description: "",
      id: "",
      images: [],
      name: "",
      tracks: { items: [{ track }] },
    };

    return playList;
  },

  trackInfoToTrack: (trackInfo: TrackInfo) => {
    const track: Track = {
      album: { images: [{ url: trackInfo.cover, height: 0, width: 0, uri: "" }] },
      artists: trackInfo.artist.split(", ").map((name) => ({ name })),
      name: trackInfo.title,
      uri: trackInfo.uri,
      id: trackInfo.id,
    };

    return track;
  },

  trackInfosToPlayList: (trackInfos: TrackInfo[]) => {
    const items = trackInfos.map((trackInfo) => ({ track: Convert.trackInfoToTrack(trackInfo) }));
    const playList: PlayList = {
      description: "",
      id: "",
      images: [],
      name: "",
      tracks: { items },
    };
    return playList;
  },

  changeTrackOrder: (playList: PlayList, idx: number) => {
    if (idx === 0) return playList;
    const prevItems = playList.tracks.items;
    const items = [...prevItems.slice(idx), ...prevItems.slice(0, idx)];
    const newPlayList: PlayList = {
      description: "",
      id: "",
      images: [],
      name: "",
      tracks: { items },
    };
    return newPlayList;
  },
});
