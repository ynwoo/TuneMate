import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen = ({}: ProfileScreenProps): JSX.Element => {
  const [username, setUsername] = useState<string>('이름');

  const handleUsername = (value: string) => {
    setUsername(value);
  };

  return (
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
    </View>
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
