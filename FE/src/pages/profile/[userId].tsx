import React, { useState, useEffect } from "react";
import IndividualProfile from "@/components/profile/IndividualProfile/IndividualProfile";
import Playlist from "@/components/playlists";
import {
  createIndividualPlayList,
  createIndividualPlayListTrack,
  deleteIndividualPlayListTrack,
  getIndividualPlayListRepresentative,
  getIndividualPlayLists,
  updateIndividualPlayList,
  getOthersProfile,
  getOthersPlayList,
} from "@/api/music/individual";
import { getUserInfo } from "@/api/user";
import { Storage } from "@/utils/storage";
import NonCloseableMenu from "@/components/menus/NonCloseable";
import useMenu from "@/hooks/useMenu";
import PlaylistData from "@/components/playlists/PlaylistData/PlaylistData";
import { AddTrack, DeleteTrack, TrackInfo } from "@/types/spotify";
import Modal from "@/components/modal/Modal";
import useModal from "@/hooks/useModal";
import SearchTrack from "@/components/playlists/SearchTrack/SearchTrack";
import Toast from "@/components/toast/Toast";
import useToast from "@/hooks/useToast";
import { useRecoilState } from "recoil";
import { MainplaylistState, AlbumState } from "@/store/atom";
import useIndividualPlayListRepresentativeQuery from "@/hooks/queries/music/individual/useIndividualPlayListRepresentativeQuery";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { Convert } from "@/utils/convert";
import useUserInfo from "@/hooks/useUserInfo";
import { spotifyApi } from "@/api";

const ProfilePage = () => {
  const params = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [imgSrc, setImgSrc] = useState("/favicon.ico");
  const [menuContent, setMenuContent] = useState<any[]>([]);
  const { isMenuOpen, openMenu, closeMenu } = useMenu();
  const [playlistName, setPlaylistName] = useState("");
  const [myPlaylist, setMyPlaylist] = useState<TrackInfo[]>([]);
  const [playlistId, setPlaylistId] = useState("");
  const { closeToggle, isOpen, openToggle } = useModal();
  const { popToast, toastStatus, toastMsg } = useToast();
  const [mainplaylist, setMainplaylist] = useRecoilState(MainplaylistState);
  const [Album, setAlbum] = useRecoilState(AlbumState);
  const { data: individualPlayListRepresentative } = useIndividualPlayListRepresentativeQuery();
  const userInfo = useUserInfo();

  useEffect(() => {
    if (individualPlayListRepresentative) {
      const allUris = individualPlayListRepresentative.tracks.items.map((track) => track.track.uri);
      setMainplaylist(allUris);
    }
  }, [individualPlayListRepresentative]);

  // 내 리스트에서 uri만 싹 모아서 mainPlaylist에 추가
  useEffect(() => {
    const uriArray = myPlaylist.map((item) => item.uri);
    const albumArt = myPlaylist.map((item) => item.cover);
    setAlbum(albumArt);
    setMainplaylist(uriArray);
  }, [myPlaylist]);
  const [isSameUser, setIsSameUser] = useState<boolean>(true);

  const getSpotifyPlaylists = async () => {
    const spotifyUserId = Storage.getSpotifyUserId();
    const playlistList = await getIndividualPlayLists(spotifyUserId);
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
    updateIndividualPlayList(id);
    closeMenu();
    getUserPlaylist();
  };

  const getOtherUserPlaylist = async (playlistId: string) => {
    const playList = await getOthersPlayList(playlistId);
    setPlaylistName(playList.name);
    const tmpData = Convert.playListToTrackInfos(playList);
    setMyPlaylist(tmpData);
  };

  const getUserPlaylist = async () => {
    const playList = await getIndividualPlayListRepresentative();
    if (playList.id !== null) {
      setPlaylistName(playList.name);
      setPlaylistId(playList.id);
      const tmpData = Convert.playListToTrackInfos(playList);
      setMyPlaylist(tmpData);
    } else {
      const tempPlaylist = {
        name: "개인 플레이리스트",
        description: "",
        open: false,
      };
      createIndividualPlayList(tempPlaylist);
      getSpotifyPlaylists();
    }
  };

  useEffect(() => {
    const userId = params?.userId as string;
    if (!userId) return;
    const getUserProfile = async () => {
      if (!userId) return;

      if (userId === userInfo?.userId) {
        setIsSameUser(true);
        const userData = await getUserInfo(userId);
        if (userData?.imageUrl) {
          setImgSrc(userData.imageUrl);
        }
        setName(userData.name);
        getUserPlaylist();
      } else {
        setIsSameUser(false);
        const userData = await getOthersProfile(userId);
        setPlaylistId(userData.playlistId);
        if (userData?.imageUrl) {
          setImgSrc(userData.imageUrl);
        }
        setName(userData.name);
        getOtherUserPlaylist(userData.playlistId);
      }
    };

    getUserProfile();
  }, [router.query.userId]);

  const deleteTrack = async (index: number) => {
    const data: DeleteTrack = {
      playlistId: playlistId,
      uri: myPlaylist[index].uri,
      positions: [index],
    };
    await deleteIndividualPlayListTrack(data);
    popToast("삭제되었습니다");
  };

  const handleDelete = (index: number) => {
    const data = [...myPlaylist].filter((music) => music.index !== index);
    let changedData: any[] = [];
    data.forEach((music, idx) => {
      music.index = idx;
      changedData.push(music);
    });
    setMyPlaylist(changedData);
    deleteTrack(index);
  };

  const addTrack = async (uri: string) => {
    const data: AddTrack = {
      playlistId: playlistId,
      uris: [uri],
      position: myPlaylist.length,
    };
    await createIndividualPlayListTrack(data);
    popToast("노래가 추가되었습니다");
  };

  const handleAdd = (data: TrackInfo) => {
    setMyPlaylist([...myPlaylist, ...[data]]);
    addTrack(data.uri);
  };

  const changePlaylistName = async(name: string) => {
    const data = {
      name: name
    }
    const response = await spotifyApi.put(`/playlists/${playlistId}`, data)
    setPlaylistName(name);
  }

  return (
    <div>
      <IndividualProfile name={name} src={imgSrc} />
      <Playlist
        className="playlist"
        isSameUser={isSameUser}
        playlistName={playlistName}
        data={myPlaylist}
        playlistId={playlistId}
        onRequestDelete={handleDelete}
        setModalOpen={openToggle}
        changeName={changePlaylistName}
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
      <Modal className="modal" isOpen={isOpen} toggle={closeToggle}>
        <SearchTrack myPlaylist={myPlaylist} handleAdd={handleAdd} />
      </Modal>
      {toastStatus && <Toast toastStatus={toastStatus} msg={toastMsg} />}
    </div>
  );
};

export default ProfilePage;
