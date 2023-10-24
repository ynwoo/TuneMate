import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const PlaylistItem = () => {
  return (
    <View style={styles.block}>
      <View style={styles.itemLeft}>
        <Image style={styles.albumImg} source={{uri: 'https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg'}} style={styles.albumImg} />
        <View style={styles.songInfo}>
          <Text style={styles.songText}>Fine</Text>
          <Text style={styles.artistText}>태연</Text>
        </View>
      </View>
      <Icon 
        color={'#666666'}
        size={30}
        name="play-circle-outline"
      />
    </View>
  )
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: '#fdfdfd',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  albumImg: {
    width: 40,
    height: 40,
  },
  songInfo: {
    justifyContent: "center",
    marginLeft: 10,
  },
  songText: {
    fontSize: 20,
    fontColor: '#666666'
  },
  artistText: {
    fontSize: 15,
    fontColor: '#666666'
  }
});

export default PlaylistItem;
