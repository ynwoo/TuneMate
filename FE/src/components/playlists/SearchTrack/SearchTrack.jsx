import { Container, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import styles from './SearchTrack.module.css';
import SpotifyWebApi from "spotify-web-api-node";
import TrackData from "../TrackData/TrackData";
import { spotifyApi } from "@/api";

const SearchTrack = ({handleAdd}) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!searchInput) return setSearchResults([]);

    let cancel = false;

    const searchForTracks = async () => {
      const response = await spotifyApi.get(`/search?type=track&q=${encodeURIComponent(searchInput)}`)
      console.log(response.data);
      setSearchResults(
        response.data.tracks.items.map((track) => {
          const trackArtists = track.artists;
          let trackArtist = "";
          for (let i = 0; i < trackArtists.length; i++) {
            if (i === trackArtists.length - 1) {
              trackArtist = trackArtist + trackArtists[i].name;
            } else {
              trackArtist = trackArtist + trackArtists[i].name + ", ";
            }
          }
          return {
            artist: trackArtist,
            title: track.name,
            uri: track.uri,
            cover: track.album.images[2].url,
            id: track.id
          };
        })
      );
    }
    searchForTracks()
    return () => {
      cancel = true;
    };
  }, [searchInput]);

  return (
    <div className={styles['container']}>
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
        {searchResults.map((track) => (
          <TrackData
          key={track.id}
          value={track}
          handleAdd={handleAdd}
        />
        ))}
      </div>
    </div>
  );
};

export default SearchTrack;
