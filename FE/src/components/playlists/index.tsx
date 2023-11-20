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
import { ChangeTrackIndex, TrackInfo } from "@/types/spotify";
import { PlayList } from "@/types/playList";
import useIndividualPlayListsQuery from "@/hooks/queries/music/individual/useIndividualPlayListsQuery";
import usePlayList from "@/hooks/usePlayList";
import { classNameWrapper } from "@/utils/className";
import ChangeName from "./ChangeName/ChangeName";
import SimpleModal from "../modal/SimpleModal";
import useUserInfo from "@/hooks/useUserInfo";
import Button from "../button/Button";
import useUpdateIndividualPlayListMutation from "@/hooks/mutations/music/individual/useUpdateIndividualPlayListMutation";

type ModalType = "menu" | "changeName";

interface PlaylistProps extends Props {
  data: TrackInfo[];
  playlistName: string;
  playlistId: PlayList["id"];
  isSameUser: boolean;
  onRequestDelete: (index: number) => void;
  setModalOpen: () => void;
  changeName: (name: string) => Promise<void>;
}

const Playlist = ({
  data,
  playlistName,
  playlistId,
  isSameUser,
  onRequestDelete,
  setModalOpen,
  className,
  changeName,
}: PlaylistProps) => {
  const { closeToggle, isOpen, openToggle } = useModal();
  const changePlayListModal = useModal();
  const [playlistData, setPlaylistData] = useState(data);
  const [deleteMode, setDeleteMode] = useState(false);
  const [status, setStatus] = useState<ModalType>("menu");
  const { changePlayList } = usePlayList();
  const userInfo = useUserInfo();
  const { data: playLists } = useIndividualPlayListsQuery(
    userInfo?.spotifyUserId
  );
  const { mutate: updateIndividualPlayList } =
    useUpdateIndividualPlayListMutation();
  useEffect(() => {
    if (data) {
      setPlaylistData(data);
    }
  }, [data]);

  const changePlaylistOrder = async (changeTrackIndex: ChangeTrackIndex) => {
    await updateIndividualPlayListTrack({
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
    const rangeEnd = result.destination.index;
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

  const openMenu = (e: MouseEvent<HTMLDivElement>) => {
    setStatus("menu");
    onModal(e);
  };

  const openChangeName = (e: MouseEvent<HTMLDivElement>) => {
    closeToggle();
    setStatus("changeName");
    onModal(e);
  };

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

  const closeModal = () => {
    closeToggle();
  };

  const onChangePlayListModal = () => {
    closeToggle();
    changePlayListModal.openToggle();
  };

  const onChangePlayList = (playlistId: PlayList["id"]) => {
    updateIndividualPlayList(playlistId);
    changePlayListModal.closeToggle();
  };

  return (
    <>
      <div className={classNameWrapper(styles["container"], className)}>
        <div className={styles["playlist-upper"]}>
          <Text type="playlist" content={playlistName} />
          {isSameUser ? (
            <div>
              {deleteMode ? (
                <div onClick={() => setDeleteMode(false)}>
                  <Icon.CircleCheck />
                </div>
              ) : (
                <div onClick={openMenu}>
                  <Icon.Menu />
                </div>
              )}
            </div>
          ) : (
            <div />
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
                        isSameUser={isSameUser}
                        key={songData.id + `${idx}`}
                        value={songData}
                        index={idx}
                        onRequestDelete={onRequestDelete}
                        isDeleteMode={deleteMode}
                        onClick={() => changePlayList(playlistData, idx)}
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
      {status === "menu" ? (
        <Modal className="modal-w80" isOpen={isOpen} toggle={closeToggle}>
          <div className={styles["modal-box"]}>
            <div className={styles["modal-content"]} onClick={openSearch}>
              <Text type="title" content="노래 추가하기" />
            </div>
            <div className={styles["division-line"]} />
            <div className={styles["modal-content"]} onClick={openChangeName}>
              <Text type="title" content="플레이리스트 이름 바꾸기" />
            </div>
            <div className={styles["division-line"]} />
            <div className={styles["modal-content"]} onClick={handleDeleteMode}>
              <Text type="title" content="노래 삭제하기" />
            </div>
            <div className={styles["division-line"]} />
            <div
              className={styles["modal-content"]}
              onClick={onChangePlayListModal}
            >
              <Text type="title" content="대표 플레이리스트 변경" />
            </div>
          </div>
        </Modal>
      ) : (
        <SimpleModal isOpen={isOpen} toggle={closeToggle}>
          <ChangeName changeName={changeName} closeModal={closeModal} />
        </SimpleModal>
      )}
      <Modal
        isOpen={changePlayListModal.isOpen}
        toggle={changePlayListModal.closeToggle}
      >
        <ul>
          <div style={{ margin: "15px" }}>
            {playLists?.map(({ name, id }) => (
              <li className={styles["change-playList-modal-item"]}>
                <p>{name}</p>
                <Button
                  className={styles["bbtton"]}
                  onClick={() => onChangePlayList(id)}
                  color="none"
                >
                  변경
                </Button>
              </li>
            ))}
          </div>
        </ul>
      </Modal>
    </>
  );
};

export default Playlist;
