import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PlaylistItem from './PlaylistItem';
import PlaylistMenu from './PlaylistMenu';
import Props from '@/types';
import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import {
  GestureHandlerRootView,
  gestureHandlerRootHOC,
} from 'react-native-gesture-handler';
import MyModal from '@/components/modal/MyModal';
import SearchBar from '@/components/search/SearchBar';
import SearchMusicItem from '../search/SearchMusicItem';

interface PlayListProps extends Props {
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
}

const Playlist = ({ data, setData }: PlayListProps) => {
  const [playlistName, setPlaylistName] = useState<string>('플레이리스트 1');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onModal = () => {
    setModalVisible(true);
  };

  const renderItem = gestureHandlerRootHOC(
    ({ item, drag, isActive }: RenderItemParams<any>) => {
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
            listData={data}
            setListData={setData}
            />
          </TouchableOpacity>
        </ScaleDecorator>
      );
    }
  );

  const DraggableList = gestureHandlerRootHOC(() => (
    <View>
      <DraggableFlatList
        data={data}
        onDragEnd={({ data }) => setData(data)}
        keyExtractor={(item) => item.key}
        scrollEnabled={false}
        renderItem={renderItem}
      />
    </View>
  ));

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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <DraggableList />
      </GestureHandlerRootView>
      <MyModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title="곡 추가"
      >
        <SearchBar />
        <SearchMusicItem
          key={1}
          index={0}
          data={{
            title: 'Fine',
            artist: '태연',
            cover:
              'https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg',
          }}
          listData={data}
          setListData={setData}
        />
        <SearchMusicItem
          key={2}
          index={1}
          data={{
            title: 'Fine',
            artist: '태연',
            cover:
              'https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg',
          }}
          listData={data}
          setListData={setData}
        />
        <SearchMusicItem
          key={3}
          index={2}
          data={{
            title: 'Fine',
            artist: '태연',
            cover:
              'https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg',
          }}
          listData={data}
          setListData={setData}
        />
      </MyModal>
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
