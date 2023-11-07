import React from "react";
import Props from "@/types";
import styles from './PlaylistItem.module.css';
import Cover from "../Cover/Cover";
import Text from '../Text/Text';
import Icon from "@/components/icons";

interface PlaylistItemProps extends Props {
  src: string;
  artist: string;
  title: string;
}

const PlaylistItem = ({ src, artist, title }: PlaylistItemProps) => {
  return (
    <div className={styles['container']}>
      <div className={styles['item-left']}>
        <Cover src={src} alt="album-cover" />
        <div className={styles['text-box']}>
          <Text content={title} type="title" />
          <Text content={artist} type="artist" />
        </div>
      </div>
      <Icon.PlayMusic />
    </div>
  );
};

export default PlaylistItem;
