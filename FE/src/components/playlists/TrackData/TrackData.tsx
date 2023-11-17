import React, { MouseEvent } from "react";
import Props from "@/types";
import styles from "./TrackData.module.css";
import Cover from "../Cover/Cover";
import Text from "../Text/Text";
import Icon from "@/components/icons";
import usePlayList from "@/hooks/usePlayList";
import { TrackInfo } from "@/types/spotify";

interface TrackDataProps extends Props {
  trackInfo: TrackInfo;
  handleAdd: (trackInfo: TrackInfo) => void;
}

const TrackData = ({ trackInfo, handleAdd }: TrackDataProps) => {
  const { changePlayList } = usePlayList();

  const addTrack = () => {
    handleAdd(trackInfo);
  };

  const onClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    changePlayList(trackInfo);
  };

  const { title, artist, cover, uri, id } = trackInfo;
  return (
    <div className={styles["container"]}>
      <div className={styles["track-data-inner"]}>
        <div className={styles["item-left"]} onClick={onClick}>
          <Cover src={cover} alt="album-cover" />
          <div className={styles["text-box"]}>
            <Text content={title} type="title-small" />
            <Text content={artist} type="artist-small" />
          </div>
        </div>
        <div className={styles["item-right"]}>
          <div onClick={addTrack}>
            <Icon.SquarePlus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackData;
