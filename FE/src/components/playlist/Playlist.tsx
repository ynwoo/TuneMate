import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import PlaylistItem from "./PlaylistItem";
import PlaylistMenu from "./PlaylistMenu";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Playlist = () => {
  const playlistName: string = '플레이리스트 1'
  // const userID = '31uk2txy3yfmuqbsilkm6up27uki';
  // useEffect(() => {
  //   const getUserPlaylist = () => {
  //   }
  // }, []);

  return (
    <View style={styles.block}>
      <View style={styles.titleBlock}>
        <Text style={styles.titleText}>{ playlistName }</Text>
        <PlaylistMenu />
      </View>
      <View>
        <PlaylistItem />
        <PlaylistItem />
        <PlaylistItem />
        <PlaylistItem />
        <PlaylistItem />
        <PlaylistItem />
      </View>
    </View>
  )
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 20,
    color: '#1c1c1c',
  }
});

export default Playlist;
