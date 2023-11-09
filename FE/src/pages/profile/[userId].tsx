import React, { useState, useEffect } from "react";
import Props from "@/types";
import { UserInfo } from "@/types/user";
import IndividualProfile from "@/components/profile/IndividualProfile/IndividualProfile";
import Playlist from "@/components/playlists";
import { getIndividualPlayListRepresentative } from "@/api/music/individual";
import { getUserInfo } from "@/api/user";

const ProfilePage = () => {
  const [name, setName] = useState("Name");
  const [imgSrc, setImgSrc] = useState(
    "https://3.bp.blogspot.com/-XKyHG9ipUuk/WxvKRN9CeYI/AAAAAAABMn8/usJ7TuHvS4s8Qff7wFV6iY6vtRwM3bQwgCLcBGAs/s400/music_headphone_man.png"
  );
  const [spotifyUserId, setSpotifyUserId] = useState('');

  const [deleteMode, setDeleteMode] = useState(false);

  const handleDeleteMode = () => {
    if (deleteMode) {
      setDeleteMode(false);
    } else {
      setDeleteMode(true);
    }
  }

  useEffect(() => {
    const userId = '23cb91d3-78ac-45b0-995a-38f8bd348dff'
    const getUserPlaylist = async() => {
      const repPlaylistData = await getIndividualPlayListRepresentative();
      console.log(repPlaylistData);
    };
    const getUserProfile = async() => {
        const userData = await getUserInfo(userId)
        console.log(userData);
        setName(userData.name);
        setSpotifyUserId(userData.spotifyUserId)
        getUserPlaylist()
    };
    getUserProfile();
  }, [])

  const data = [
    {
      title: "Fine1",
      artist: "태연",
      cover:
        "https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg",
      id: "0",
    },
    {
      title: "Fine2",
      artist: "태연",
      cover:
        "https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg",
      id: "1",
    },
    {
      title: "Fine3",
      artist: "태연",
      cover:
        "https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg",
      id: "2",
    },
    {
      title: "Fine4",
      artist: "태연",
      cover:
        "https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg",
      id: "3",
    },
    {
      title: "Fine5",
      artist: "태연",
      cover:
        "https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg",
      id: "4",
    },
    {
      title: "Fine6",
      artist: "태연",
      cover:
        "https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg",
      id: "5",
    },
  ];

  const [myPlaylist, setMyPlaylist] = useState([...data]);

  const handleDelete = (id: string) => {
    const newData = [...myPlaylist];
    setMyPlaylist(newData.filter((music) => music.id !== id));
    console.log(myPlaylist);
  };

  return (
    <div>
      <IndividualProfile name={name} src={imgSrc} />
      <Playlist data={myPlaylist} onRequestDelete={handleDelete} />
    </div>
  );
};

export default ProfilePage;
