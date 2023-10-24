import { useNavigation } from '@react-navigation/core';
import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackNavigationProp } from '@/screens/types';
import Props from '@/types';
import ChatList from './ChatList';
import ChatInputBar from './ChatInputBar';

interface ChatMainProps extends Props {
  onOpenDrawer: () => void;
}

const ChatMain = ({ onOpenDrawer }: ChatMainProps) => {
  const [text, setText] = useState<string>('');
  const navigation = useNavigation<RootStackNavigationProp>();

  const onPress = useCallback(() => {
    /** 전송 하는 코드 */
  }, []);

  return (
    <>
      <View style={styles.topTab}>
        <MaterialCommunityIcons
          color={styles.topTabItem.color}
          size={styles.topTabItem.size}
          name="arrow-left"
          onPress={() => navigation.pop(1)}
        />
        <MaterialCommunityIcons
          color={styles.topTabItem.color}
          size={styles.topTabItem.size}
          name="menu"
          onPress={onOpenDrawer}
        />
      </View>
      <ChatList style={styles.chat} />
      <ChatInputBar
        onPress={onPress}
        text={text}
        onChangeText={setText}
        style={styles.chatInputBar}
      />
    </>
  );
};

const styles = StyleSheet.create({
  topTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    padding: 10,
    backgroundColor: '#FDFDFD',
  },
  topTabItem: {
    color: 'gray',
    size: 30,
  },
  chat: {
    flex: 1,
  },
  chatInputBar: {
    position: 'absolute',
    bottom: 0,
    padding: 5,
    zIndex: 1,
  },
});

export default ChatMain;
