import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackParamList } from './types';
import Playlist from '@/components/playlist/Playlist';
import MyModal from '@/components/modal/MyModal';
import PlaylistItem from '@/components/playlist/PlaylistItem';

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
        <PlaylistItem key={1} playing />
        <PlaylistItem key={2} playing={false} />
        <PlaylistItem key={3} playing={false} />
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
