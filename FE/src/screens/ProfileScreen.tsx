import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import Playlist from '@/components/playlist/Playlist';
import MyModal from '@/components/modal/MyModal';
import PlaylistItem from '@/components/playlist/PlaylistItem';
import SearchBar from '@/components/search/SearchBar';

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen = ({ route }: ProfileScreenProps): JSX.Element => {
  const [username, setUsername] = useState<string>('이름');
  const [refreshing, setRefreshing] = React.useState(false);
  const { userId } = route.params ?? '';
  console.log(userId);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [data, setData] = useState<any[]>([
    {
      title: 'Fine',
      artist: '태연',
      cover:
        'https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg',
      key: 1,
    },
    {
      title: 'Fine',
      artist: '태연',
      cover:
        'https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg',
      key: 2,
    },
    {
      title: 'Fine',
      artist: '태연',
      cover:
        'https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg',
      key: 3,
    },
    {
      title: 'Fine',
      artist: '태연',
      cover:
        'https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg',
      key: 4,
    },
    {
      title: 'Fine',
      artist: '태연',
      cover:
        'https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg',
      key: 5,
    },
    {
      title: 'Fine6',
      artist: '태연',
      cover:
        'https://www.musickorea.asia/storage/woo680821KR/www/prefix/product/2017/08/O/product.10987.148781799077237.jpg',
      key: 6,
    },
  ]);

  const handleUsername = (value: string) => {
    setUsername(value);
  };

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
          <Playlist data={data} setData={setData} />
        </View>
      </ScrollView>
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
