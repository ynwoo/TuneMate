import { Form } from "react-bootstrap";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import styles from "./SearchTrack.module.css";
import TrackData from "../TrackData/TrackData";
import { spotifyApi } from "@/api";
import { Convert } from "@/utils/convert";
import useDebounce from "@/hooks/useDebounce";
import Nothing from "@/components/nothing/Nothing/Nothing";
import { Track, TrackInfo } from "@/types/spotify";
import Props from "@/types";

interface SearchTrackProps extends Props {
  handleAdd: (track: TrackInfo) => void;
  myPlaylist: TrackInfo[];
}

const SearchTrack = ({ handleAdd, myPlaylist }: SearchTrackProps) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<TrackInfo[]>();
  const debounceSearchInput = useDebounce(searchInput, 200);

  const searchForTracks = useCallback(
    async (searchInput: string) => {
      if (!searchInput) return;
      const response = await spotifyApi.get(
        `/search?type=track&q=${encodeURIComponent(searchInput)}`
      );
      return response.data.tracks.items.map((track: Track, index: number) =>
        Convert.trackToTrackInfo(track, index)
      );
    },
    [Convert]
  );

  const onAdd = (trackInfo: TrackInfo) => {
    handleAdd(trackInfo);
    setSearchResults(
      (searchResults) => searchResults && searchResults.filter(({ id }) => id !== trackInfo.id)
    );
  };

  const myTrackIds = useMemo(() => myPlaylist?.map(({ id }) => id), [myPlaylist]);

  useEffect(() => {
    searchForTracks(debounceSearchInput).then((data) => {
      const newSearchResults = myTrackIds
        ? data?.filter((trackInfo: TrackInfo) => !myTrackIds.includes(trackInfo.id))
        : data;
      setSearchResults(newSearchResults);
    });
  }, [debounceSearchInput, myTrackIds]);

  return (
    <div className={styles["container"]}>
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="my-custom-class rounded-pill"
        style={{
          border: "2px solid #d4bafd",
          borderRadius: "20px",
          padding: "10px",
          width: "100%",
        }}
      />
      <div style={{ overflowY: "auto" }}>
        {searchResults?.map((trackInfo) => (
          <TrackData key={trackInfo.id} trackInfo={trackInfo} handleAdd={onAdd} />
        )) || <Nothing className={styles["nothing"]}>검색 결과 없음</Nothing>}
      </div>
    </div>
  );
};

export default SearchTrack;
