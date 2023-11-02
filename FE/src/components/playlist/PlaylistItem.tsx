import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type PlayProps = {
  playing: boolean;
};

const PlaylistItem = ({ playing }: PlayProps) => {
  return (
    <View style={playing ? styles.blockPoint : styles.block}>
      <View style={styles.itemLeft}>
        <Image
          style={styles.albumImg}
          source={{
            uri: 'https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg',
          }}
        />
        <View style={styles.songInfo}>
          <Text style={playing ? styles.songTextPoint : styles.songText}>
            Fine
          </Text>
          <Text style={playing ? styles.artistTextPoint : styles.artistText}>
            태연
          </Text>
        </View>
      </View>
      <Icon
        color={playing ? '#fdfdfd' : '#666666'}
        size={30}
        name="play-circle-outline"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  blockPoint: {
    backgroundColor: '#463296',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  block: {
    backgroundColor: '#fdfdfd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  albumImg: {
    width: 40,
    height: 40,
  },
  songInfo: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  songText: {
    fontSize: 20,
    color: '#666666',
  },
  artistText: {
    fontSize: 15,
    color: '#666666',
  },
  songTextPoint: {
    fontSize: 20,
    color: '#fdfdfd',
  },
  artistTextPoint: {
    fontSize: 15,
    color: '#fdfdfd',
  },
});

export default PlaylistItem;
