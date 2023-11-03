import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuModal from '@/components/modal/MenuModal';

type MusicProps = {
  data: {
    title: string;
    artist: string;
    cover: string;
  };
  index: number;
  listData: any[];
  setListData: React.Dispatch<React.SetStateAction<any[]>>;
};

const SearchMusicItem = ({
  data,
  index,
  listData,
  setListData,
}: MusicProps) => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onModal = () => {
    setModalVisible(true);
  };

  const Divider = () => <View style={styles.divider} />;

  const handlePlaying = () => {
    if (playing) {
      setPlaying(false);
    } else {
      setPlaying(true);
    }
  };

  const addToPlaylist = () => {
    const addingData = [
      {
        title: data.title,
        artist: data.artist,
        cover: data.cover,
        key: listData.length + 1,
      },
    ];
    const newData = [...listData, ...addingData];
    for (let i = 0; i < newData.length; i++) {
      console.log(newData[i].key);
      newData[i].key = i + 1;
      console.log(newData[i].key);
    }
    console.log(newData);
    setListData(newData);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePlaying} onLongPress={onModal}>
        <View style={playing ? styles.blockPoint : styles.block}>
          <View style={styles.itemLeft}>
            <Image
              style={styles.albumImg}
              source={{
                uri: data.cover,
              }}
            />
            <View style={styles.songInfo}>
              <Text style={playing ? styles.songTextPoint : styles.songText}>
                {data.title}
              </Text>
              <Text
                style={playing ? styles.artistTextPoint : styles.artistText}
              >
                {data.artist}
              </Text>
            </View>
          </View>
          <Icon
            color={playing ? '#fdfdfd' : '#666666'}
            size={30}
            name="play-circle-outline"
          />
        </View>
      </TouchableOpacity>
      <MenuModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <TouchableOpacity onPress={addToPlaylist}>
          <View style={styles.menu}>
            <Text style={styles.songText}>곡 추가하기</Text>
          </View>
        </TouchableOpacity>
      </MenuModal>
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
    width: 320,
  },
  block: {
    backgroundColor: '#fdfdfd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: 320,
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
  deleteBox: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    paddingLeft: 31,
    height: 60,
  },
  deleteText: {
    color: '#fdfdfd',
    fontSize: 15,
  },
  background: {
    backgroundColor: '#cccccc',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#666666',
  },
  menu: {
    padding: 5,
  },
});

export default SearchMusicItem;
