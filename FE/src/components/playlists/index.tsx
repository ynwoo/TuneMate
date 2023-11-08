import React, { MouseEvent, useCallback, useEffect, useState } from 'react'
import Props from '@/types';
import PlaylistItem from './PlaylistItem/PlaylistItem';
import styles from './playlists.module.css';
import Text from './Text/Text';
import Icon from '../icons';
import Modal from '../modal/Modal';
import useModal from '@/hooks/useModal';
import { AnimatePresence, Reorder } from 'framer-motion';

interface PlaylistProps extends Props {
  data: any[];
  onRequestDelete: (id: number) => void;
}

const Playlist = ({ data, onRequestDelete }: PlaylistProps) => {
  const { closeToggle, isOpen, openToggle } = useModal();
  const [playlistData, setPlaylistData] = useState(data);
  
  useEffect(() => {
    setPlaylistData([...data]);
  }, [data]);

  const onModal = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      openToggle();
    },
    [openToggle]
  );

  const playlistname = '플레이리스트 1'

  return (
    <>
    <div className={styles['container']}>
      <div className={styles['playlist-upper']}>
        <Text type='playlist' content={playlistname} />
        <div onClick={onModal}>
          <Icon.Menu />
        </div>
      </div>
      <Reorder.Group className={styles['playlist-box']} axis="y" values={playlistData} onReorder={setPlaylistData}>
      {playlistData.map((data) => (
        <PlaylistItem key={data.id} value={data} onRequestDelete={onRequestDelete} />
      ))}
      </Reorder.Group>
    </div>
    <Modal
      isOpen={isOpen}
      toggle={closeToggle}  
    >
      <div>
        <Text type='title' content='순서 바꾸기'/>
        <Text type='title' content='순서 바꾸기'/>
      </div>
    </Modal>
    </>
  );
};

export default Playlist;
