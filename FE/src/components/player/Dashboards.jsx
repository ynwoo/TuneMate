import { Container, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";
import Player from "./Player";
import axios from "axios";
import PlaylistDetails from "./PlaylistDetails"; // 위에서 만든 PlaylistDetails 컴포넌트를 불러옵니다.
const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const spotifyApi = new SpotifyWebApi({ clientId });

export default function Dashboard({ accessToken }) {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  //   const [lyrics, setLyrics] = useState(""); // lyrics 상태 추가
  const [playlists, setPlaylists] = useState([]);
  const [playlistDetails, setPlaylistDetails] = useState(null);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  // 선택한 리스트
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
  }

  function handleConfirmClick() {
    if (selectedPlaylistId) {
      const endpoint = `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`;
      axios
        .get(endpoint, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          const playlistDetails = response.data;
          setPlaylistDetails(playlistDetails);
        })
        .catch((error) => {
          console.error(
            "플레이리스트 상세 정보를 가져오는 중 오류 발생:",
            error
          );
        });
    }
  }

  function handleSelectChange(event) {
    setSelectedPlaylistId(event.target.value);
  }

  useEffect(() => {
    if (!playingTrack) return;
    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((data) => {
        // setLyrics(data.data.lyrics);
      });
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    // Spotify API 엔드포인트 URL
    const endpoint = "https://api.spotify.com/v1/me/playlists";

    // Spotify API 요청
    axios
      .get(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // 플레이리스트 데이터를 가져와 상태에 설정
        setPlaylists(response.data.items);
        console.log(response.data.items);
      })
      .catch((error) => {
        console.error("플레이리스트를 가져오는 중 오류 발생:", error);
      });
  }, [accessToken]);

  function handlePlaylistClick(playlistId) {
    setSelectedPlaylistId(playlistId);
    // Spotify API 엔드포인트 URL
    const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}`;

    // Spotify API 요청
    axios
      .get(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // 선택한 플레이리스트의 상세 정보가 response.data에 있음
        const playlistDetails = response.data;
        console.log("선택한 플레이리스트 상세 정보:", playlistDetails);
        // 여기에서 필요한 정보를 상태로 설정하거나 렌더링하면 됩니다.
        // 예를 들어, 선택한 플레이리스트의 상세 정보를 상태로 설정
        setPlaylistDetails(playlistDetails);
        // 곡 목록도 설정
        setPlaylistTracks(playlistDetails.tracks.items);
      })
      .catch((error) => {
        console.error("플레이리스트 상세 정보를 가져오는 중 오류 발생:", error);
      });
  }

  useEffect(() => {
    if (playlistDetails) {
      setPlaylistTracks(playlistDetails.tracks.items);
    }
  }, [playlistDetails]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;

    spotifyApi.searchTracks(search).then((data) => {
      if (cancel) return;
      setSearchResults(
        data.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => {
      cancel = true;
    };
  }, [search, accessToken]);
  useEffect(() => {
    const endpoint = "https://api.spotify.com/v1/me/playlists";
    spotifyApi.setAccessToken(accessToken);

    axios
      .get(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setPlaylists(response.data.items);
      })
      .catch((error) => {
        console.error("플레이리스트를 가져오는 중 오류 발생:", error);
      });
  }, [accessToken]);

  return (
    <Container
      className="d-flex flex-column py-2"
      style={{ height: "100vh", margin: 10 }}
    >
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="my-custom-class rounded-pill" // Bootstrap 클래스 및 둥근 스타일 클래스 추가
        style={{
          border: "2px solid #d4bafd", // 테두리 스타일
          borderRadius: "20px", // 테두리를 더 둥글게 만듭니다.
          padding: "10px", // 내용과 테두리 사이의 간격 조절
          width: "100%",
        }}
      />
      <div style={{ overflowY: "auto" }}>
        {searchResults.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </Container>
  );
}
