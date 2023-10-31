import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import Playlist from '@/components/playlist/Playlist';
import MyModal from '@/components/modal/MyModal';
import PlaylistItem from '@/components/playlist/PlaylistItem';
import SearchBar from '@/components/search/SearchBar';

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen = ({}: ProfileScreenProps): JSX.Element => {
  const [username, setUsername] = useState<string>('이름');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleUsername = (value: string) => {
    setUsername(value);
  };

  const onModal = () => {
    setModalVisible(true);
  };

  return (
    <>
      <ScrollView>
        <View style={styles.block}>
          <View style={styles.profileImgBlock}>
            <Image
              source={require('@/assets/images/temp-image.png')}
              style={styles.profileImg}
            />
          </View>
          <View style={styles.nameBlock}>
            <Text style={styles.nameText}>{username}</Text>
          </View>
          <Playlist onModal={onModal} />
        </View>
      </ScrollView>
      <MyModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title="곡 추가"
      >
        <SearchBar />
        <PlaylistItem
          key={1}
          index={0}
          data={{
            title: 'Fine',
            artist: '태연',
            cover:
              'https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg',
          }}
          playing
        />
        <PlaylistItem
          key={2}
          index={1}
          data={{
            title: 'Fine',
            artist: '태연',
            cover:
              'https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg',
          }}
          playing={false}
        />
        <PlaylistItem
          key={3}
          index={2}
          data={{
            title: 'Fine',
            artist: '태연',
            cover:
              'https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg',
          }}
          playing={false}
        />
      </MyModal>
    </>
  );
};

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
  },
  profileImgBlock: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: '#E4DDFF',
    borderStyle: 'solid',
    borderWidth: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  profileImg: {
    width: 200,
    height: 200,
  },
  nameBlock: {
    width: 300,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fdfdfd',
    borderRadius: 10,
  },
  nameText: {
    fontSize: 20,
  },
});

export default ProfileScreen;
