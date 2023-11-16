import React, { MouseEvent, useCallback, useEffect, useState } from "react";
import Props from "@/types";
import PlaylistItem from "../PlaylistItem/PlaylistItem";
import styles from "./CommonPlaylist.module.css";
import Text from "../Text/Text";
import Icon from "@/components/icons";
import Modal from "@/components/modal/Modal";
import useModal from "@/hooks/useModal";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { updateCommonPlayListTrack } from "@/api/music/common";
import { ChangeTrackIndex } from "@/types/spotify";
import { PlayList } from "@/types/playList";
import { updateIndividualPlayListTrack } from "@/api/music/individual";

interface CommonPlaylistProps extends Props {
  data: any[];
  playlistName: string;
  playlistId: PlayList["id"];
  onRequestDelete: (index: number) => void;
  setModalOpen: () => void;
}

const CommonPlaylist = ({
  data,
  playlistName,
  playlistId,
  onRequestDelete,
  setModalOpen,
}: CommonPlaylistProps) => {
  const { closeToggle, isOpen, openToggle } = useModal();
  const [playlistData, setPlaylistData] = useState(data);
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {
    setPlaylistData([...data]);
  }, [data]);

  const changePlaylistOrder = async (changeTrackIndex: ChangeTrackIndex) => {
    const change = await updateCommonPlayListTrack({
      playlistId,
      changeTrackIndex,
    });
    console.log("순서바꾸기 api 끝");
  };

  const handleChange = (result: any) => {
    if (!result.destination) return;
    const newData = [...playlistData];
    const [reorderedItem] = newData.splice(result.source.index, 1);
    newData.splice(result.destination.index, 0, reorderedItem);
    const rangeStart = result.source.index;
    const insertBefore = () => {
      if (rangeStart < result.destination.index) {
        return result.destination.index + 1;
      } else {
        return result.destination.index;
      }
    };
    const changeTrackIndex: ChangeTrackIndex = {
      range_start: rangeStart,
      insert_before: insertBefore(),
      range_length: 1,
    };
    setPlaylistData(newData);
    changePlaylistOrder(changeTrackIndex);
    console.log("순서 바꾸기 끝");
  };

  const onModal = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      openToggle();
    },
    [openToggle]
  );

  const openSearch = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setModalOpen();
      closeToggle();
    },
    [closeToggle]
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
                        isSameUser={true}
                        key={songData.id + `${idx}`}
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
          <div className={styles["modal-content"]} onClick={openSearch}>
            <Text type="title" content="노래 추가하기" />
          </div>
          <div className={styles["division-line"]}/>
          <div className={styles["modal-content"]}>
            <Text type="title" content="플레이리스트 이름 바꾸기" />
          </div>
          <div className={styles["division-line"]}/>
          <div className={styles["modal-content"]} onClick={handleDeleteMode}>
            <Text type="title" content="노래 삭제하기" />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CommonPlaylist;
