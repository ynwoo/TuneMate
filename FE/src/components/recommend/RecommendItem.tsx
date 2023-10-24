import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProfileImage from '../image/ProfileImage';
import { Friend } from '@/types/friend';
import Props from '@/types';

interface RecommendItemProps extends Props {
  item: Friend;
}

const RecommendItem = ({ item, style }: RecommendItemProps) => {
  return (
    <View style={[style, styles.recommendItem]}>
      <View style={[styles.colContainer, styles.marginRightAuto]}>
        <ProfileImage style={styles.profileImage} />
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
