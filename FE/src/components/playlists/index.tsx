import React, { MouseEvent, useCallback, useEffect, useState } from "react";
import Props from "@/types";
import PlaylistItem from "./PlaylistItem/PlaylistItem";
import styles from "./playlists.module.css";
import Text from "./Text/Text";
import Icon from "../icons";
import Modal from "../modal/Modal";
import useModal from "@/hooks/useModal";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

interface PlaylistProps extends Props {
  data: any[];
  onRequestDelete: (id: string) => void;
}

const Playlist = ({ data, onRequestDelete }: PlaylistProps) => {
  const { closeToggle, isOpen, openToggle } = useModal();
  const [playlistData, setPlaylistData] = useState(data);
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {
    setPlaylistData([...data]);
  }, [data]);

  const handleChange = (result: any) => {
    if (!result.destination) return;
    const newData = [...playlistData];
    const [reorderedItem] = newData.splice(result.source.index, 1);
    newData.splice(result.destination.index, 0, reorderedItem);
    setPlaylistData(newData);
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

  const playlistname = "플레이리스트 1";

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["playlist-upper"]}>
          <Text type="playlist" content={playlistname} />
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
