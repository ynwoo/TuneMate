import React, { useState } from "react";
import Props from "@/types";
import { UserInfo } from "@/types/user";
import IndividualProfile from "@/components/profile/IndividualProfile/IndividualProfile";
import Playlist from "@/components/playlists";

const ProfilePage = () => {
  const name = "Name";
  const imgSrc =
    "https://3.bp.blogspot.com/-XKyHG9ipUuk/WxvKRN9CeYI/AAAAAAABMn8/usJ7TuHvS4s8Qff7wFV6iY6vtRwM3bQwgCLcBGAs/s400/music_headphone_man.png";
  const data = [
    {
      title: "Fine1",
      artist: "태연",
      cover:
        "https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg",
      id: 0,
    },
    {
      title: "Fine2",
      artist: "태연",
      cover:
        "https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg",
      id: 1,
    },
    {
      title: "Fine3",
      artist: "태연",
      cover:
        "https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg",
      id: 2,
    },
    {
      title: "Fine4",
      artist: "태연",
      cover:
        "https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg",
      id: 3,
    },
    {
      title: "Fine5",
      artist: "태연",
      cover:
        "https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg",
      id: 4,
    },
    {
      title: "Fine6",
      artist: "태연",
      cover:
        "https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg",
      id: 5,
    },
  ];

  const [myPlaylist, setMyPlaylist] = useState(data);

  const handleDelete = (id: number) => {
    setMyPlaylist(myPlaylist.filter((music) => music.id !== id));
  };

  return (
    <div>
      <IndividualProfile name={name} src={imgSrc} />
      <Playlist data={data} onRequestDelete={handleDelete} />
    </div>
  );
};

export default ProfilePage;
