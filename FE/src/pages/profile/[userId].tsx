import React, { useState, useEffect } from "react";
import Props from "@/types";
import IndividualProfile from "@/components/profile/IndividualProfile/IndividualProfile";
import Playlist from "@/components/playlists";
import {
  createIndividualPlayList,
  createIndividualPlayListTrack,
  deleteIndividualPlayListTrack,
  getIndividualPlayListRepresentative,
  getIndividualPlayLists,
  updateIndividualPlayList,
} from "@/api/music/individual";
import { getUserInfo } from "@/api/user";
import { Storage } from "@/utils/storage";
import { Cookie } from "@/utils/cookie";
import NonCloseableMenu from "@/components/menus/NonCloseable";
import useMenu from "@/hooks/useMenu";
import PlaylistData from "@/components/playlists/PlaylistData/PlaylistData";
import { AddTrack, DeleteTrack } from "@/types/spotify";
import Modal from "@/components/modal/Modal";
import useModal from "@/hooks/useModal";
import SearchTrack from "@/components/playlists/SearchTrack/SearchTrack";
import Toast from "@/components/toast/Toast";
import useToast from "@/hooks/useToast";

type TrackInfo = {
  title: string;
  artist: string;
  cover: string;
  uri: string;
  id: string;
};

const ProfilePage = () => {
  const [name, setName] = useState("Name");
  const [imgSrc, setImgSrc] = useState(
    "https://3.bp.blogspot.com/-XKyHG9ipUuk/WxvKRN9CeYI/AAAAAAABMn8/usJ7TuHvS4s8Qff7wFV6iY6vtRwM3bQwgCLcBGAs/s400/music_headphone_man.png"
  );
  const [menuContent, setMenuContent] = useState<any[]>([]);
  const { isMenuOpen, openMenu, closeMenu } = useMenu();
  const [playlistName, setPlaylistName] = useState("");
  const [myPlaylist, setMyPlaylist] = useState<any[]>([]);
  const [playlistId, setPlaylistId] = useState("");
  const { closeToggle, isOpen, openToggle } = useModal();
  const {popToast, toastStatus, toastMsg} = useToast();

  const getSpotifyPlaylists = async () => {
    const spotifyUserId = Storage.getSpotifyUserId();
    const playlistList = await getIndividualPlayLists(spotifyUserId);
    console.log(playlistList);
    const dataset = [...playlistList];
    dataset.forEach((data, index) => {
      const newContent = [
        {
          imgSrc: data.images[2],
          name: data.name,
          id: data.id,
          trackCnt: data.tracks.total,
          index: index,
        },
      ];
      setMenuContent([...menuContent, ...newContent]);
    });
    openMenu();
  };

  const setRepPlaylist = async (id: string) => {
    console.log(id);
    updateIndividualPlayList(id);
    closeMenu();
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
          cover: baseData.album.images[2].url,
          id: baseData.id,
          uri: baseData.uri,
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
      const { userId } = Cookie.getTokenResponse();
      const userData = await getUserInfo(userId);
      console.log(userData);
      setName(userData.name);
      getUserPlaylist();
    };
    getUserProfile();
  }, []);

  const deleteTrack = async (index: number) => {
    const data: DeleteTrack = {
      playlistId: playlistId,
      uri: myPlaylist[index].uri,
      positions: [index],
    };
    console.log(data.uri);
    const response = await deleteIndividualPlayListTrack(data);
    popToast('삭제되었습니다')
  };

  const handleDelete = (index: number) => {
    setMyPlaylist((prevData) =>
      prevData.filter((music) => music.index !== index)
    );
    deleteTrack(index);
    console.log(myPlaylist);
  };

  const addTrack = async (uri: string) => {
    const data: AddTrack = {
      playlistId: playlistId,
      uris: [uri],
      position: myPlaylist.length
    }
    const response = await createIndividualPlayListTrack(data);
    popToast('노래가 추가되었습니다');
  }

  const handleAdd = (data: TrackInfo) => {
    setMyPlaylist([...myPlaylist, ...[data]])
    addTrack(data.uri)
    console.log(myPlaylist);
  }

  return (
    <div>
      <IndividualProfile name={name} src={imgSrc} />
      <Playlist
        playlistName={playlistName}
        data={myPlaylist}
        playlistId={playlistId}
        onRequestDelete={handleDelete}
        setModalOpen={openToggle}
      />
      <NonCloseableMenu isMenuOpen={isMenuOpen}>
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
      <Modal isOpen={isOpen} toggle={closeToggle}>
        <SearchTrack handleAdd={handleAdd} />
      </Modal>
      {toastStatus && <Toast toastStatus={toastStatus} msg={toastMsg} />}
    </div>
  );
};

export default ProfilePage;
