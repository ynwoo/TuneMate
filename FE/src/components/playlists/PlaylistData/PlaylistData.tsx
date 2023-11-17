import React, { useEffect, useState } from "react";
import Props from "@/types";
import styles from "./PlaylistData.module.css";
import Cover from "../Cover/Cover";
import Text from "../Text/Text";
import Icon from "@/components/icons";
interface PlaylistDataProps extends Props {
  imgSrc: string;
  name: string;
  id: string;
  trackCnt: number;
  index: number;
  setRep: (id: string) => Promise<void>;
}

const PlaylistData = ({ imgSrc, trackCnt, name, index, id, setRep }: PlaylistDataProps) => {
  const setRepPl = () => {
    setRep(id);
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["playlist-item-inner"]}>
        <div className={styles["item-left"]}>
          <Cover src={imgSrc} alt="album-cover" />
          <div className={styles["text-box"]}>
            <Text content={name} type="title" />
            <Text content={`${trackCnt}곡`} type="artist" />
          </div>
        </div>
        <div className={styles["item-right"]}>
          <div onClick={setRepPl}>
            <Icon.SquarePlus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistData;
