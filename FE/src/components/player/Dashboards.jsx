import { Container, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";
import PlaylistDetails from "./PlaylistDetails"; // 위에서 만든 PlaylistDetails 컴포넌트를 불러옵니다.
import useUpdateIndividualPlayListMutation from "@/hooks/mutations/music/individual/useUpdateIndividualPlayListMutation";
import useIndividualPlayListRepresentativeQuery from "@/hooks/queries/music/individual/useIndividualPlayListRepresentativeQuery";
import { spotifyApi as spotify } from "@/api";
import { Storage } from "@/utils/storage";
import { ListInfoState } from "@/store/atom";
import { useRecoilState } from "recoil";
import SinglePlayer from "./SinglePlayer";

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIEND_ID;
const spotifyApi = new SpotifyWebApi(clientId);

export default function Dashboard({ accessToken, className }) {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [playlists, setPlaylists] = useState([]);
  const [playlistDetails, setPlaylistDetails] = useState(null);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [ListInfo, setListInfo] = useRecoilState(ListInfoState);
  const { mutate: updateIndividualPlayList } =
    useUpdateIndividualPlayListMutation();
  const { data: individualPlayListRepresentative } =
    useIndividualPlayListRepresentativeQuery();

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
  }

  function handleSelectChange(event) {
    setSelectedPlaylistId(event.target.value);
  }

  // 대표 플레이리스트 설정
  function handleselect() {
    updateIndividualPlayList(selectedPlaylistId);
  }
  useEffect(() => {
    if (individualPlayListRepresentative) {
      setListInfo(individualPlayListRepresentative.tracks.items[0].track);
    }
    // setInfo(individualPlayListRepresentative.tracks.items[0]);
  });

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (playlistDetails) {
      setPlaylistTracks(playlistDetails.tracks.items);
    }
  }, [playlistDetails, setListInfo]);

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
    const user_id = Storage.getSpotifyUserId();
    const endpoint = `users/${user_id}/playlists`;
    spotify
      .get(endpoint)
      .then((response) => {
        // 플레이리스트 데이터를 가져와 상태에 설정
        setPlaylists(response.data.items);
        console.log(response.data.items);
      })
      .catch((error) => {});
  }, [accessToken]);

  return (
    <Container
      className={`d-flex flex-column py-2 ${className}`}
      style={{ height: "100vh", margin: 10 }}
    >
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
            style={{ display: "flex" }}
            playlistId={individualPlayListRepresentative.id}
          />
        ))}
      </div>
      <div>
        <SinglePlayer />
        <h3>대표 플레이 리스트 선택</h3>
        <select className="form-select" onChange={handleSelectChange}>
          <option value="">플레이리스트 선택</option>
          {playlists.map((playlist) => (
            <option key={playlist.id} value={playlist.id}>
              {playlist.name}
            </option>
          ))}
        </select>
        <button onClick={handleselect} style={{ marginTop: "10px" }}>
          대표 플레이리스트 설정
        </button>

        {/* <button onClick={handleConfirmClick}>선택</button> */}
      </div>
      {individualPlayListRepresentative && (
        <div style={{ border: "1px solid black" }}>
          <PlaylistDetails
            playlistDetails={individualPlayListRepresentative}
            accessToken={accessToken}
            chooseTrack={chooseTrack}
          />
        </div>
      )}
    </Container>
  );
}
