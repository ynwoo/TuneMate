import React, { JSXElementConstructor, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PlaylistItem from './PlaylistItem';
import PlaylistMenu from './PlaylistMenu';
import Props from '@/types';

interface PlayListProps extends Props {
  onModal?: () => void;
}

const Playlist = ({ onModal }: PlayListProps) => {
  const playlistName = '플레이리스트 1';
  // const userID = '31uk2txy3yfmuqbsilkm6up27uki';
  // useEffect(() => {
  //   const getUserPlaylist = () => {
  //   }
  // }, []);

  const [itemList, setItemList] = useState<any[]>([
    <PlaylistItem key={1} playing />,
    <PlaylistItem key={2} playing={false} />,
    <PlaylistItem key={3} playing={false} />,
    <PlaylistItem key={4} playing={false} />,
    <PlaylistItem key={5} playing={false} />,
    <PlaylistItem key={7} playing={false} />,
  ]);

  return (
    <View style={styles.block}>
      <View style={styles.titleBlock}>
        <Text style={styles.titleText}>{playlistName}</Text>
        {/* <PlaylistMenu /> */}
        <Icon
          onPress={onModal}
          color="#666666"
          size={25}
          name="plus-circle-outline"
        />
      </View>
      <View>{itemList}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    width: 360,
    margin: 20,
    backgroundColor: '#FDFDFD',
    borderRadius: 10,
    padding: 20,
  },
  titleBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  titleText: {
    fontSize: 20,
    color: '#1c1c1c',
  },
});

export default Playlist;
