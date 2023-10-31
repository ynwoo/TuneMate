import React, { useState } from 'react';
import { View, Text, StyleSheet ,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PlaylistItem from './PlaylistItem';
import PlaylistMenu from './PlaylistMenu';
import Props from '@/types';
import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import {GestureHandlerRootView, gestureHandlerRootHOC} from 'react-native-gesture-handler';

interface PlayListProps extends Props {
  onModal?: () => void;
}

const Playlist = gestureHandlerRootHOC(({ onModal }: PlayListProps) => {
  const playlistName = '플레이리스트 1';
  // const userID = '31uk2txy3yfmuqbsilkm6up27uki';
  // useEffect(() => {
  //   const getUserPlaylist = () => {
  //   }
  // }, []);

  const renderItem = gestureHandlerRootHOC(({item, drag, isActive}: RenderItemParams<any>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          activeOpacity={1}
          onLongPress={drag}
          disabled={isActive}
        >
          <PlaylistItem
            data={item}
            index={item.key - 1}
            playing={false} />
        </TouchableOpacity>
      </ScaleDecorator>
    );
  });

  const [data, setData] = useState<any[]>([
    {
      title: 'Fine',
      artist: '태연',
      cover: 'https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg',
      key: 1,
    },
    {
      title: 'Fine',
      artist: '태연',
      cover: 'https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg',
      key: 2,
    },
    {
      title: 'Fine',
      artist: '태연',
      cover: 'https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg',
      key: 3,
    },
    {
      title: 'Fine',
      artist: '태연',
      cover: 'https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg',
      key: 4,
    },
    {
      title: 'Fine',
      artist: '태연',
      cover: 'https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg',
      key: 5,
    },
    {
      title: 'Fine6',
      artist: '태연',
      cover: 'https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg',
      key: 6,
    },
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
      <GestureHandlerRootView style={{flex: 1}}>
      <DraggableFlatList
        data={data}
        onDragEnd={({data}) => setData(data)}
        keyExtractor={(item) => item.key}
        scrollEnabled={false}
        renderItem={renderItem}
      />
    </GestureHandlerRootView>
    </View>
  );
});

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
