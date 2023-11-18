import React, { useEffect } from "react";
import Props from "@/types";
import styles from "./PlaylistItem.module.css";
import Cover from "../Cover/Cover";
import Text from "../Text/Text";
import Icon from "@/components/icons";
import { Draggable } from "react-beautiful-dnd";
import { PickTrackState, PickTrackUriState, AlubumArtState } from "@/store/atom";
import { useRecoilState } from "recoil";
import { Track, TrackInfo } from "@/types/spotify";

type SongInfo = {
  title: string;
  artist: string;
  cover: string;
  index: number;
  id: string;
  uri: string;
};

interface PlaylistItemProps extends Props {
  isSameUser: boolean;
  value: TrackInfo;
  index: number;
  onRequestDelete: (idx: number) => void;
  isDeleteMode: boolean;
  onClick?: () => void;
}

const PlaylistItem = ({
  value,
  index,
  isSameUser,
  onRequestDelete,
  isDeleteMode,
  onClick,
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
      artists: [{ name: value.artist }],
      name: value.title,
      uri: value.uri,
      id: value.id,
    };
    setPickTrack(track);
    setPickTrackUri(track.uri);
    setAlubumArt(track.album.images[0].url);
    console.log("p", PickTrack);
  };

  return (
    <Draggable draggableId={id as string} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <div className={styles["container"]}>
            <div className={styles["playlist-item-inner"]}>
              <div className={styles["item-left"]} onClick={onClick}>
                <Cover src={cover} alt="album-cover" />
                <div className={styles["text-box"]}>
                  <Text className={styles["text-box__title"]} content={title} type="title" />
                  <Text className={styles["text-box__name"]} content={artist} type="artist" />
                </div>
              </div>
              <div className={styles["item-right"]}>
                {isSameUser ? (
                  <div>
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
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default PlaylistItem;
