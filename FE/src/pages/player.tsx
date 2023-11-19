import styles from "@/styles/PlayerPage.module.css";
import usePlayList from "@/hooks/usePlayList";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Playlist from "@/components/playlists/index";
import {
  createIndividualPlayListTrack,
  deleteIndividualPlayListTrack,
  getIndividualPlayListRepresentative,
} from "@/api/music/individual";
import Modal from "@/components/modal/Modal";
import SearchTrack from "@/components/playlists/SearchTrack/SearchTrack";
import Toast from "@/components/toast/Toast";
import { Storage } from "@/utils/storage";
import useMenu from "@/hooks/useMenu";
import { AddTrack, DeleteTrack, TrackInfo } from "@/types/spotify";
import useModal from "@/hooks/useModal";
import useToast from "@/hooks/useToast";
import { useRecoilState } from "recoil";
import { MainplaylistState, AlbumState } from "@/store/atom";
import useIndividualPlayListRepresentativeQuery from "@/hooks/queries/music/individual/useIndividualPlayListRepresentativeQuery";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { Convert } from "@/utils/convert";
import useUserInfo from "@/hooks/useUserInfo";
import { spotifyApi } from "@/api";

const Player = () => {
  const { currentTrack } = usePlayList();
  const [currentSlide, setCurrentSlide] = useState(1);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 1 ? 2 : 1));
  };

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
  const { data: individualPlayListRepresentative } =
    useIndividualPlayListRepresentativeQuery();
  const userInfo = useUserInfo();

  useEffect(() => {
    if (individualPlayListRepresentative) {
      const allUris = individualPlayListRepresentative.tracks.items.map(
        (track) => track.track.uri
      );
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

  const getUserPlaylist = async () => {
    const playList = await getIndividualPlayListRepresentative();
    if (playList.id !== null) {
      setPlaylistName(playList.name);
      setPlaylistId(playList.id);
      const tmpData = Convert.playListToTrackInfos(playList);
      setMyPlaylist(tmpData);
    }
  };

  useEffect(() => {
    getUserPlaylist();
  }, []);

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

  const changePlaylistName = async (name: string) => {
    const data = {
      name: name,
    };
    const response = await spotifyApi.put(`/playlists/${playlistId}`, data);
    setPlaylistName(name);
  };
  return (
    <>
      <div className={styles["player-page"]}>
        {currentTrack && (
          <>
            <div className="slides">
              <div
                id="slide-1"
                className={`${styles["player-page__slide"]} ${
                  currentSlide === 1 ? styles.activeSlide : ""
                }`}
              >
                <div style={{ height: "250px" }}>
                  <div className={styles["player-page__image-container"]}>
                    <div className={styles["player-page__image"]}>
                      <Image
                        src={currentTrack.image}
                        alt={currentTrack.name}
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className={styles["player-page__rotate-image"]}></div>
                  </div>
                </div>
              </div>
              <div
                id="slide-2"
                className={`${styles["player-page__slide"]} ${
                  currentSlide === 2 ? styles.activeSlide : ""
                }`}
              >
                <div className={styles["AlbumAtr"]}>
                  <Image
                    src={currentTrack.image}
                    alt={currentTrack.name}
                    width={240}
                    height={240}
                    className={styles["iimage"]}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={nextSlide}
              style={{
                backgroundColor: "transparent",
                border: "1px solid transparent",
              }}
            >
              <Image
                src="/arrow.png" // public 폴더의 이미지 경로
                alt="Arrow"
                width={25}
                height={25}
              />
            </button>
          </>
        )}
      </div>
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
      <Modal className="modal" isOpen={isOpen} toggle={closeToggle}>
        <SearchTrack myPlaylist={myPlaylist} handleAdd={handleAdd} />
      </Modal>
      {toastStatus && <Toast toastStatus={toastStatus} msg={toastMsg} />}
    </>
  );
};

export default Player;
