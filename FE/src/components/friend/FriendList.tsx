import { StyleSheet, FlatList } from 'react-native';
import React from 'react';
import FriendItem from './FriendItem';
import { Friend } from '@/types/friend';
import Props from '@/types';

type FriendListProps = Props;

const data: Friend[] = [
  { id: '0', name: 'a' },
  { id: '1', name: 'b' },
  { id: '2', name: 'c' },
  { id: '3', name: 'd' },
  { id: '4', name: 'e' },
  { id: '6', name: 'b' },
  { id: '7', name: 'c' },
  { id: '8', name: 'd' },
  { id: '9', name: 'e' },
];

const FriendList = ({ style }: FriendListProps) => {
  return (
    <FlatList
      style={style}
      data={data}
      renderItem={({ item }) => (
        <FriendItem key={item.id} style={styles.friendItem} item={item} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  friendItem: {
    marginBottom: 15,
  },
});

export default FriendList;
