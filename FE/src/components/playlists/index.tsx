import React, { MouseEvent, useCallback, useEffect, useState } from "react";
import Props from "@/types";
import PlaylistItem from "./PlaylistItem/PlaylistItem";
import styles from "./playlists.module.css";
import Text from "./Text/Text";
import Icon from "../icons";
import Modal from "../modal/Modal";
import useModal from "@/hooks/useModal";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { updateIndividualPlayListTrack } from "@/api/music/individual";
import { ChangeTrackIndex } from "@/types/spotify";
import { PlayList } from "@/types/playList";

interface PlaylistProps extends Props {
  data: any[];
  playlistName: string;
  playlistId: PlayList["id"];
  onRequestDelete: (index: number) => void;
}

const Playlist = ({
  data,
  playlistName,
  playlistId,
  onRequestDelete,
}: PlaylistProps) => {
  const { closeToggle, isOpen, openToggle } = useModal();
  const [playlistData, setPlaylistData] = useState(data);
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {
    setPlaylistData([...data]);
  }, [data]);

  const changePlaylistOrder = async (changeTrackIndex: ChangeTrackIndex) => {
    const change = await updateIndividualPlayListTrack({
      playlistId,
      changeTrackIndex,
    });
    console.log('순서바꾸기 api 끝')
  };

  const handleChange = (result: any) => {
    if (!result.destination) return;
    const newData = [...playlistData];
    const [reorderedItem] = newData.splice(result.source.index, 1);
    newData.splice(result.destination.index, 0, reorderedItem);
    const rangeStart = result.source.index;
    const insertBefore = () => {
      if (rangeStart === 1) {
        return result.destination.index + 1;
      } else {
        return result.destination.index;
      }
    }
    const changeTrackIndex: ChangeTrackIndex = {
      range_start: rangeStart,
      insert_before: insertBefore(),
      range_length: 1,
    };
    setPlaylistData(newData);
    changePlaylistOrder(changeTrackIndex);
    console.log('순서 바꾸기 끝')
  };

  const onModal = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      openToggle();
    },
    [openToggle]
  );

  const handleDeleteMode = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setDeleteMode(true);
      closeToggle();
    },
    [closeToggle]
  );

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["playlist-upper"]}>
          <Text type="playlist" content={playlistName} />
          {deleteMode ? (
            <div onClick={() => setDeleteMode(false)}>
              <Icon.CircleCheck />
            </div>
          ) : (
            <div onClick={onModal}>
              <Icon.Menu />
            </div>
          )}
        </div>
        <div className={styles["playlist-box"]}>
          <DragDropContext onDragEnd={handleChange}>
            <Droppable droppableId="playlist">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <>
                    {playlistData.map((songData, idx) => (
                      <PlaylistItem
                        key={songData.id}
                        value={songData}
                        index={idx}
                        onRequestDelete={onRequestDelete}
                        isDeleteMode={deleteMode}
                      />
                    ))}
                    {provided.placeholder}
                  </>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
      <Modal isOpen={isOpen} toggle={closeToggle}>
        <div className={styles["modal-box"]}>
          <div>
            <Text type="title" content="플레이리스트 이름 바꾸기" />
          </div>
          <div onClick={handleDeleteMode}>
            <Text type="title" content="노래 삭제하기" />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Playlist;
