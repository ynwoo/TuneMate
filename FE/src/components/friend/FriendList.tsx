import { StyleSheet, FlatList } from 'react-native';
import React from 'react';
import FriendItem from './FriendItem';
import Props from '@/types';
import { Friend } from '@/types/social';

interface FriendListProps extends Props {
  friends: Friend[];
}

const FriendList = ({ style, friends }: FriendListProps) => {
  return (
    <FlatList
      style={style}
      data={friends}
      renderItem={({ item }) => (
        <FriendItem key={item.freindId} style={styles.friendItem} item={item} />
      )}
      keyExtractor={(item) => String(item.freindId)}
    />
  );
};

const styles = StyleSheet.create({
  friendItem: {
    marginBottom: 15,
  },
});

export default FriendList;
