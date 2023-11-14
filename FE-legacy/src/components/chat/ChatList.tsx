import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Chat } from '@/types/chat';
import ChatItem from './ChatItem';
import Props from '@/types';

const data: Chat[] = [
  { id: '0', message: 'aaas', userId: '1' },
  { id: '1', message: 'bbbb', userId: '2' },
  { id: '2', message: 'cccc', userId: '1' },
  { id: '3', message: 'dddd', userId: '2' },
];

type ChatListProps = Props;

const ChatList = ({ style }: ChatListProps) => {
  return (
    <FlatList
      style={style}
      data={data}
      renderItem={({ item }) => (
        <ChatItem key={item.id} style={styles.chatItem} item={item} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  chatItem: {
    height: 30,
    width: 'auto',
    margin: 10,
    borderRadius: 20,
    padding: 10,
    backgroundColor: 'white',
  },
  profileImage: {
    height: 20,
  },
});

export default ChatList;
