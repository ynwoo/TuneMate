import React from "react";
import useCreateIndividualPlayListTrackMutation from "@/hooks/mutations/music/individual/useCreateIndividualPlayListTrackMutation";
import Props from "@/types";
import styles from "./TrackData.module.css";
import Cover from "../Cover/Cover";
import Text from "../Text/Text";
import Icon from "@/components/icons";

type TrackInfo = {
  title: string;
  artist: string;
  cover: string;
  uri: string;
  id: string;
};

interface TrackDataProps extends Props {
  value: TrackInfo;
  handleAdd: (data: TrackInfo) => void;
}

const TrackData = ({ value, handleAdd }: TrackDataProps) => {
  const addTrack = () => {
    handleAdd(value)
  }

  const { title, artist, cover, uri, id } = value;
  return (
    <div className={styles["container"]}>
      <div className={styles["track-data-inner"]}>
        <div className={styles["item-left"]}>
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
