import React, { useState, useEffect } from "react";
import Props from "@/types";
import { UserInfo } from "@/types/user";
import IndividualProfile from "@/components/profile/IndividualProfile/IndividualProfile";
import Playlist from "@/components/playlists";
import {
  createIndividualPlayList,
  getIndividualPlayListRepresentative,
  getIndividualPlayLists,
  updateIndividualPlayList,
} from "@/api/music/individual";
import { getUserInfo } from "@/api/user";
import { Storage } from "@/utils/storage";
import axios from "axios";
import { Cookie } from "@/utils/cookie";
import NonCloseableMenu from "@/components/menus/NonCloseable";
import useMenu from "@/hooks/useMenu";
import PlaylistData from "@/components/playlists/PlaylistData/PlaylistData";

const ProfilePage = () => {
  const [name, setName] = useState("Name");
  const [imgSrc, setImgSrc] = useState(
    "https://3.bp.blogspot.com/-XKyHG9ipUuk/WxvKRN9CeYI/AAAAAAABMn8/usJ7TuHvS4s8Qff7wFV6iY6vtRwM3bQwgCLcBGAs/s400/music_headphone_man.png"
  );
  const [menuContent, setMenuContent] = useState<any[]>([]);
  const { userId } = Cookie.getTokenResponse();
  const spotifyUserId = Storage.getSpotifyUserId();
  const { isOpen, openToggle, closeToggle } = useMenu();
  const [playlistName, setPlaylistName] = useState("");
  const [myPlaylist, setMyPlaylist] = useState<any[]>([]);
  const [playlistId, setPlaylistId] = useState("");

  const getSpotifyPlaylists = async () => {
    const playlistList = await getIndividualPlayLists(spotifyUserId);
    console.log(playlistList);
    const dataset = [...playlistList];
    dataset.forEach((data, index) => {
      const newContent = [
        {
          imgSrc: data.images[0],
          name: data.name,
          id: data.id,
          trackCnt: data.tracks.total,
          index: index,
        },
      ];
      setMenuContent([...menuContent, ...newContent]);
    });
    openToggle();
  };

  const setRepPlaylist = async (id: string) => {
    console.log(id);
    updateIndividualPlayList(id);
    closeToggle();
    getUserPlaylist();
  };

  const getUserPlaylist = async () => {
    const repPlaylistData = await getIndividualPlayListRepresentative();
    console.log(repPlaylistData);
    if (repPlaylistData.id !== null) {
      setPlaylistName(repPlaylistData.name);
      setPlaylistId(repPlaylistData.id);
      console.log(repPlaylistData.tracks.items);
      const repTracks = [...repPlaylistData.tracks.items];
      const tmpData: any[] = [];
      repTracks.forEach((trackData, index) => {
        const baseData = trackData.track;
        const trackArtists = baseData.artists;
        let trackArtist = "";
        for (let i = 0; i < trackArtists.length; i++) {
          if (i === trackArtists.length - 1) {
            trackArtist = trackArtist + trackArtists[i].name;
          } else {
            trackArtist = trackArtist + trackArtists[i].name + ", ";
          }
        }
        const newData = {
          title: baseData.name,
          artist: trackArtist,
          cover: baseData.album.images[0].url,
          id: baseData.id,
          index: index,
        };
        tmpData.push(newData);
      });
      console.log(tmpData);
      setMyPlaylist(tmpData);
    } else {
      const tempPlaylist = {
        name: "tempName",
        description: "",
        open: false,
      };
      createIndividualPlayList(tempPlaylist);
      getSpotifyPlaylists();
    }
  };

  useEffect(() => {
    const getUserProfile = async () => {
      const userData = await getUserInfo(userId);
      console.log(userData);
      setName(userData.name);
      getUserPlaylist();
    };
    getUserProfile();
  }, []);

  const handleDelete = (index: number) => {
    setMyPlaylist((prevData) =>
      prevData.filter((music) => music.index !== index)
    );
    console.log(myPlaylist);
  };

  return (
    <div>
      <IndividualProfile name={name} src={imgSrc} />
      <Playlist
        playlistName={playlistName}
        data={myPlaylist}
        playlistId={playlistId}
        onRequestDelete={handleDelete}
      />
      <NonCloseableMenu isOpen={isOpen}>
        <div>
          {menuContent.map((data, idx) => (
            <PlaylistData
              key={idx}
              imgSrc={data.imgSrc.url}
              name={data.name}
              trackCnt={data.trackCnt}
              id={data.id}
              index={data.index}
              setRep={setRepPlaylist}
            />
          ))}
        </div>
      </NonCloseableMenu>
    </div>
  );
};

export default ProfilePage;
