import { Image, StyleSheet } from 'react-native';
import React from 'react';
import Props from '@/types';

type ProfileImageProps = Props;

const ProfileImage = ({ style }: ProfileImageProps) => {
  return (
    <Image
      style={[style, styles.profileImage]}
      source={{
        uri: 'https://reactnative.dev/img/tiny_logo.png',
      }}
    />
  );
};

const styles = StyleSheet.create({
  profileImage: {
    borderRadius: 50,
  },
});

export default ProfileImage;
