import React, { useState, useEffect } from "react";
import CommonProfile from "@/components/profile/CommonProfile/CommonProfile";
import CommonPlaylist from "@/components/playlists/CommonPlaylist/CommonPlaylist";
import { getOthersPlayList, getOthersProfile } from "@/api/music/individual";
import {
  createCommonPlayListTrack,
  deleteCommonPlayListTrack,
} from "@/api/music/common";
import { getUserInfo } from "@/api/user";
import { AddCommonTrack, DeleteCommonTrack } from "@/types/spotify";
import Modal from "@/components/modal/Modal";
import useModal from "@/hooks/useModal";
import SearchTrack from "@/components/playlists/SearchTrack/SearchTrack";
import Toast from "@/components/toast/Toast";
import useToast from "@/hooks/useToast";
import { useParams } from "next/navigation";
import { Cookie } from "@/utils/cookie";
import { getSocialFriends } from "@/api/social";
import { TUNEMATE_API_BASE_URL } from "@/constants/url";
import { EventSourcePolyfill } from "event-source-polyfill";

type TrackInfo = {
  title: string;
  artist: string;
  cover: string;
  uri: string;
  id: string;
};

const CommonPlaylistPage = () => {
  const params = useParams();
  const relationId = Number(params?.relationId);

  const [commonName, setCommonName] = useState("Name");
  const [srcList, setSrcList] = useState<string[]>([]);
  const [playlistName, setPlaylistName] = useState("");
  const [commonPlaylist, setCommonPlaylist] = useState<any[]>([]);
  const [playlistId, setPlaylistId] = useState("");
  const { closeToggle, isOpen, openToggle } = useModal();
  const { popToast, toastStatus, toastMsg } = useToast();

  const getCommonPlaylistData = async (playlistId: string) => {
    setPlaylistId(playlistId);
    const commonPlaylistData = await getOthersPlayList(playlistId);
    console.log(commonPlaylistData);
    setPlaylistName(commonPlaylistData.name);
    console.log(commonPlaylistData.tracks.items);
    const repTracks = [...commonPlaylistData.tracks.items];
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
    setCommonPlaylist(tmpData);
  };

  const getFriendProfile = async (
    userId: string,
    username: string,
    userSrc: string,
    playlistId: string
  ) => {
    const friendProfile = await getOthersProfile(userId);
    console.log(friendProfile);
    setCommonName(username + " & " + friendProfile.name);
    if (friendProfile.imageUrl === null) {
      setSrcList([userSrc, "/favicon.ico"]);
    } else {
      setSrcList([userSrc, friendProfile.imageUrl]);
    }
    getCommonPlaylistData(playlistId);
  };

  const getFriendInfo = async (username: string, userSrc: string) => {
    const relationId = params?.relationId as string;
    const friendList = await getSocialFriends();
    console.log(friendList);
    for (let i = 0; i < friendList.length; i++) {
      console.log("checkpoint 1");
      if (friendList[i].relationId === Number(relationId)) {
        console.log("checkpoint 2");
        const playlistId = friendList[i].commonPlayListId;
        getFriendProfile(friendList[i].friendId, username, userSrc, playlistId);
        break;
      }
    }
  };

  useEffect(() => {
    const getUserProfile = async () => {
      const userId = Cookie.getUserId() as string;
      const userData = await getUserInfo(userId);
      console.log(userData);
      const username = userData.name;
      let userSrc = "";
      if (userData.imageUrl === undefined) {
        userSrc = "/favicon.ico";
      } else {
        userSrc = userData.imageUrl;
      }
      getFriendInfo(username, userSrc);
    };
    getUserProfile();
  }, []);

  useEffect(() => {
    const accessToken = Cookie.getAccessToken() as string;
    const eventSource = new EventSourcePolyfill(
      `${TUNEMATE_API_BASE_URL}/music-service/common/sse/playlists/${relationId}`,
      {
        headers: {
          Authorization: accessToken,
        },
        // withCredentials: true,
      }
    );

    console.log(eventSource);

    eventSource.addEventListener("message", async (e) => {
      const res = await e.data;
      const data = JSON.parse(res);
      console.log(data.tracks.items);
      const tmpData: any[] = [];
      data.tracks.items.forEach((trackData: any, index: number) => {
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
      setCommonPlaylist(tmpData);
    });

    eventSource.addEventListener("error", async (e) => {
      console.log(e);
    });

    return () => {
      eventSource.close();
    };
  }, []);

  const deleteTrack = async (index: number) => {
    const data: DeleteCommonTrack = {
      relationId,
      uri: commonPlaylist[index].uri,
      positions: [index],
    };
    console.log(data.uri);
    const response = await deleteCommonPlayListTrack(data);
    popToast("삭제되었습니다");
  };

  const handleDelete = (index: number) => {
    const data = [... commonPlaylist].filter((music) => music.index !== index);
    let changedData: any[]= []
    data.forEach((music, idx) => {
      music.index = idx
      changedData.push(music)
    })
    console.log(changedData)
    setCommonPlaylist(changedData);
    deleteTrack(index);
    console.log(commonPlaylist);
  };

  const addTrack = async (uri: string) => {
    const data: AddCommonTrack = {
      relationId,
      uris: [uri],
      position: commonPlaylist.length,
    };
    const response = await createCommonPlayListTrack(data);
    popToast("노래가 추가되었습니다");
  };

  const handleAdd = (data: TrackInfo) => {
    setCommonPlaylist([...commonPlaylist, ...[data]]);
    addTrack(data.uri);
    console.log(commonPlaylist);
  };

  return (
    <div>
      <CommonProfile name={commonName} srcList={srcList} />
      <CommonPlaylist
        playlistName={playlistName}
        data={commonPlaylist}
        playlistId={`${relationId}`}
        onRequestDelete={handleDelete}
        setModalOpen={openToggle}
      />
      <Modal isOpen={isOpen} toggle={closeToggle}>
        <SearchTrack handleAdd={handleAdd} />
      </Modal>
      {toastStatus && <Toast toastStatus={toastStatus} msg={toastMsg} />}
    </div>
  );
};

export default CommonPlaylistPage;
