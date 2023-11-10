import React, { useEffect, useState } from "react";
import Props from "@/types";
import styles from "./PlaylistItem.module.css";
import Cover from "../Cover/Cover";
import Text from "../Text/Text";
import Icon from "@/components/icons";
import { Draggable } from "react-beautiful-dnd";

type SongInfo = {
  title: string;
  artist: string;
  cover: string;
  index: number
  id: string;
};

interface PlaylistItemProps extends Props {
  value: SongInfo;
  index: number;
  onRequestDelete: (idx: number) => void;
  isDeleteMode: boolean;
}

const PlaylistItem = ({ value, index, onRequestDelete, isDeleteMode }: PlaylistItemProps) => {
  const { title, artist, cover, id } = value;

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className={styles["container"]}>
            <div className={styles["playlist-item-inner"]}>
              <div className={styles["item-left"]}>
                <Cover src={cover} alt="album-cover" />
                <div className={styles["text-box"]}>
                  <Text content={title} type="title" />
                  <Text content={artist} type="artist" />
                </div>
              </div>
              <div className={styles["item-right"]}>
                {isDeleteMode
                ? <div onClick={() => onRequestDelete(id)}>
                  <Icon.Delete />
                </div>
                : <div {...provided.dragHandleProps} >
                  <Icon.Handle {...provided.dragHandleProps} />
                </div>
                }
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default PlaylistItem;
