import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/core';
import ProfileImage from '../image/ProfileImage';
import Props from '@/types';
import { RootStackNavigationProp } from '@/screens/types';
import { RecommendationFriend } from '@/types/social';

interface RecommendItemProps extends Props {
  item: RecommendationFriend;
}

const RecommendItem = ({ item, style }: RecommendItemProps) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  // 프로필 페이지 이동
  const onMoveProfile = useCallback(() => {
    navigation.push('BottomTab', { screen: 'Profile' });
  }, [navigation]);

  return (
    <View style={[style, styles.recommendItem]}>
      <View style={[styles.colContainer, styles.marginRightAuto]}>
        <ProfileImage style={styles.profileImage} onPress={onMoveProfile} />
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <View style={styles.colContainer}>
        <Text style={styles.name}>거리</Text>
        <MaterialIcons
          color={styles.musicIcon.color}
          size={styles.musicIcon.size}
          name="music-note"
        />
      </View>
    </View>
  );
};

const iconSize = 30;

const styles = StyleSheet.create({
  recommendItem: {
    height: 100,
    width: 150,
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  colContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  profileImage: {
    width: iconSize,
    height: iconSize,
    marginRight: 10,
  },
  name: {
    fontSize: 15,
  },
  musicIcon: {
    color: 'blue',
    size: 30,
  },
  marginRightAuto: {
    marginRight: 'auto',
  },
});

export default RecommendItem;
