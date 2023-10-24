import { StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import ProfileImage from '../image/ProfileImage';
import {
  FriendStackNavigationProp,
  MyBottomTabNavigationProp,
} from '@/screens/types';
import { Friend } from '@/types/friend';

interface FriendItemProps {
  style?: Object;
  item: Friend;
}

const FriendItem = ({ style, item }: FriendItemProps) => {
  const navigation = useNavigation<FriendStackNavigationProp>();
  const bottomTabNavigation = useNavigation<MyBottomTabNavigationProp>();
  const onMoveChat = () => {
    navigation.push('Chat');
  };
  const onMoveSharedProfile = () => {
    bottomTabNavigation.push('BottomTab', { screen: 'Profile' });
  };
  return (
    <View style={[style, styles.friendItem]}>
      <ProfileImage style={styles.profileImage} />
      <Text style={styles.name}>{item.name}</Text>
      <MaterialIcons
        style={styles.marginRightAuto}
        color={styles.musicIcon.color}
        size={styles.musicIcon.size}
        name="music-note"
      />

      <MaterialCommunityIcons
        onPress={onMoveSharedProfile}
        color={styles.accountMusicIcon.color}
        size={styles.accountMusicIcon.size}
        name="account-music"
      />
      <MaterialIcons
        onPress={onMoveChat}
        color={styles.chatIcon.color}
        size={styles.chatIcon.size}
        name="chat"
      />
    </View>
  );
};

const iconSize = 30;

const styles = StyleSheet.create({
  friendItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: iconSize,
    height: iconSize,
    marginRight: 10,
  },
  name: {
    fontSize: 20,
  },
  musicIcon: {
    size: iconSize,
    color: 'blue',
  },
  accountMusicIcon: {
    size: iconSize,
    color: 'blue',
  },
  chatIcon: {
    size: iconSize,
    color: 'red',
  },
  marginRightAuto: {
    marginRight: 'auto',
  },
});

export default FriendItem;
