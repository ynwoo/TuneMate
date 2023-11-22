import { DrawerLayoutAndroid, StyleSheet } from 'react-native';
import React, { useRef, useState, useCallback } from 'react';
import ChatMenu from '@/components/chat/ChatMenu';
import ChatMain from '@/components/chat/ChatMain';

const ChatScreen = (): JSX.Element => {
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onCloseDrawer = useCallback(() => {
    drawer.current?.closeDrawer();
    setIsOpen(false);
  }, [drawer]);

  const onOpenDrawer = useCallback(() => {
    drawer.current?.openDrawer();
    setIsOpen(true);
  }, [drawer]);

  return (
    <>
      {!isOpen && (
        <ChatMain style={styles.chatMain} onOpenDrawer={onOpenDrawer} />
      )}
      <DrawerLayoutAndroid
        onDrawerOpen={onOpenDrawer}
        onDrawerClose={onCloseDrawer}
        style={styles.chatMenu}
        ref={drawer}
        drawerWidth={300}
        drawerPosition="right"
        renderNavigationView={() => ChatMenu({ onOpenDrawer, onCloseDrawer })}
      />
    </>
  );
};

const styles = StyleSheet.create({
  chatMain: {
    flex: 1,
  },
  chatMenu: {},
});

export default ChatScreen;
