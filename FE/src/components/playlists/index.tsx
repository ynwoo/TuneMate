import React, { MouseEvent, useCallback } from 'react'
import Props from '@/types';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import PlaylistItem from './PlaylistItem/PlaylistItem';
import styles from './playlists.module.css';
import Text from './Text/Text';
import Icon from '../icons';
import Modal from '../modal/Modal';
import useModal from '@/hooks/useModal';

interface PlaylistProps extends Props {
  data: any[];
}

const Playlist = ({ data }: PlaylistProps) => {
  const { closeToggle, isOpen, openToggle } = useModal();

  const onModal = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      openToggle();
    },
    [openToggle]
  );

  const playlistname = '플레이리스트 1'

  const PlaylistItems = () => {
    let itemArray = [];
    for (let i = 0; i < data.length; i++ ) {
      itemArray.push(
      <SwipeableListItem
        key={i}
        trailingActions={trailingActions()}
        maxSwipe={0.5}
      >
        <PlaylistItem src={data[i].cover} title={data[i].title} artist={data[i].artist} />
      </SwipeableListItem>
      )
    }
    return itemArray;
  };
  
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => console.info('swipe action triggered')}
      >
        Delete
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <>
    <div className={styles['container']}>
      <div className={styles['playlist-upper']}>
        <Text type='playlist' content={playlistname} />
        <div onClick={onModal}>
          <Icon.Menu />
        </div>
      </div>
      <SwipeableList>
      {PlaylistItems()}
      </SwipeableList>
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
