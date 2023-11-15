import React, { useEffect } from "react";
import Props from "@/types";
import styles from "./PlaylistItem.module.css";
import Cover from "../Cover/Cover";
import Text from "../Text/Text";
import Icon from "@/components/icons";
import { Draggable } from "react-beautiful-dnd";
import {
  PickTrackState,
  PickTrackUriState,
  AlubumArtState,
} from "@/store/atom";
import { useRecoilState } from "recoil";
import { Track } from "@/types/spotify";

type SongInfo = {
  title: string;
  artist: string;
  cover: string;
  index: number;
  id: string;
  uri: string;
};

interface PlaylistItemProps extends Props {
  value: SongInfo;
  index: number;
  onRequestDelete: (idx: number) => void;
  isDeleteMode: boolean;
}

const PlaylistItem = ({
  value,
  index,
  onRequestDelete,
  isDeleteMode,
}: PlaylistItemProps) => {
  const { title, artist, cover, id, uri } = value;
  const [PickTrack, setPickTrack] = useRecoilState(PickTrackState);
  const [PickTrackUri, setPickTrackUri] = useRecoilState(PickTrackUriState);
  const [AlubumArt, setAlubumArt] = useRecoilState(AlubumArtState);
  // console.log("v", value.uri);

  const handleContainerClick = () => {
    console.log("노래가 선택되었습니다.", value);
    const track: Track = {
      album: { images: [{ url: value.cover, height: 0, width: 0 }] },
      artists: [value.artist],
      name: value.title,
      uri: value.uri,
    };
    setPickTrack(track);
    setPickTrackUri(track.uri);
    setAlubumArt(track.album.images[0]);
    console.log("p", PickTrack);
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <div className={styles["container"]}>
            <div className={styles["playlist-item-inner"]}>
              <div
                className={styles["item-left"]}
                onClick={handleContainerClick}
              >
                <Cover src={cover} alt="album-cover" />
                <div className={styles["text-box"]}>
                  <Text content={title} type="title" />
                  <Text content={artist} type="artist" />
                </div>
              </div>
              <div className={styles["item-right"]}>
                {isDeleteMode ? (
                  <div onClick={() => onRequestDelete(index)}>
                    <Icon.Delete />
                  </div>
                ) : (
                  <div {...provided.dragHandleProps}>
                    <Icon.Handle {...provided.dragHandleProps} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default PlaylistItem;
