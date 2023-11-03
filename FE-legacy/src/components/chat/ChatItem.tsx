import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProfileImage from '../image/ProfileImage';
import Props from '@/types';
import { Chat } from '@/types/chat';

interface ChatItemProps extends Props {
  item: Chat;
}

const ChatItem = ({ style, item }: ChatItemProps) => {
  return (
    <View
      style={[
        style,
        styles.chatItem,
        styles[item.userId === '1' ? 'left' : 'right'],
      ]}
    >
      {item.userId === '1' ? (
        <>
          <ProfileImage style={styles.profileImage} />
          <Text style={styles.text}>{item.message}</Text>
        </>
      ) : (
        <>
          <Text style={styles.text}>{item.message}</Text>
          <ProfileImage style={styles.profileImage} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chatItem: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    width: 'auto',
  },
  profileImage: {
    height: 30,
    width: 30,
  },
  text: {
    fontSize: 15,
    marginLeft: 5,
    marginRight: 5,
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
  },
});

export default ChatItem;
