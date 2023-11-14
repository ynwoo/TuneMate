import { Image, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import Props from '@/types';

interface ProfileImageProps extends Props {
  onPress?: () => void;
}

const ProfileImage = ({ style, onPress }: ProfileImageProps) => {
  return (
    <Pressable onPress={onPress}>
      <Image
        style={[style, styles.profileImage]}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    borderRadius: 50,
  },
});

export default ProfileImage;
