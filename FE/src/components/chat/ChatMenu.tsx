import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GestureRecognizer from 'react-native-swipe-gestures';
import Props from '@/types';

interface ChatMenuProps extends Props {
  onOpenDrawer: () => void;
  onCloseDrawer: () => void;
}

const ChatMenu = ({ onOpenDrawer, onCloseDrawer }: ChatMenuProps) => {
  const onExitChat = () => {
    /* 채팅방 나가기 */
  };
  return (
    <>
      <GestureRecognizer
        style={[styles.container, styles.navigationContainer]}
        onSwipeLeft={onOpenDrawer}
        onSwipeRight={onCloseDrawer}
      >
        <View style={styles.menu}>
          <Text style={styles.paragraph}>Im in the Drawer!</Text>
        </View>
        <View style={styles.menu}>
          <Text style={styles.paragraph}>Im in the Drawer!</Text>
        </View>
      </GestureRecognizer>
      <MaterialCommunityIcons
        name="location-exit"
        style={styles.exitIcon}
        size={styles.exitIcon.size}
        color={styles.exitIcon.color}
        onPress={onExitChat}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
  exitIcon: {
    size: 30,
    color: 'gray',
    position: 'absolute',
    right: 5,
    bottom: 5,
  },
  menu: {
    height: 50,
    width: 300,
    backgroundColor: 'violet',
  },
});

export default ChatMenu;
