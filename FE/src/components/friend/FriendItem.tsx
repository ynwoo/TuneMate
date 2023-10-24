import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/core';
import ProfileImage from '../image/ProfileImage';
import { RootStackNavigationProp } from '@/screens/types';
import React from 'react';

interface FriendItemProps {
  style?: Object;
}

const FriendItem = ({ style }: FriendItemProps) => {
  const { navigate } = useNavigation<RootStackNavigationProp>();
  const onMoveChat = () => {
    navigate('Chat');
  };
  return (
    <View style={[style, styles.friendItem]}>
      <ProfileImage style={styles.profileImage} />
      <Text style={styles.name}>이름</Text>
      <Icon
        color={styles.musicIcon.color}
        size={styles.musicIcon.size}
        name="music-note"
      />
      <Icon
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
    marginRight: 'auto',
  },
  musicIcon: {
    size: iconSize,
    color: 'blue',
  },
  chatIcon: {
    size: iconSize,
    color: 'red',
  },
});

export default FriendItem;
