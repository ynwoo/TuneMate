import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';

const Divider = () => <View style={styles.divider} />;
const PlaylistMenu = () => {
  return (
    <MenuProvider style={styles.container}>
      <Menu
        renderer={renderers.SlideInMenu}
        rendererProps={
          {
            // placement: 'right',
            // anchorStyle: {
            //   width: 100,
            //   height: 75,
            //   borderRadius: 10,
            //   borderWidth: 1,
            //   borderColor: '#1c1c1c',
            //   justifyContent: "center",
            //   alignItems: "center",
            //   position: "absolute",
            // }
          }
        }
      >
        <MenuTrigger>
          <Icon color="#666666" size={20} name="dots-vertical" />
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: {
              width: 200,
              height: 150,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#1c1c1c',
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}
        >
          <MenuOption text="이름 변경하기" />
          <Divider />
          <MenuOption text="노래 추가하기" />
          <Divider />
          <MenuOption text="초기화" />
        </MenuOptions>
      </Menu>
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  menuBlockTop: {
    borderBottomWidth: 1,
    borderBottomColor: '#1c1c1c',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  menuBlockMid: {
    borderBottomWidth: 1,
    borderBottomColor: '#1c1c1c',
  },
  menuBlockBot: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  container: {
    backgroundColor: '#fff',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '666666',
  },
});

export default PlaylistMenu;
