import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProfileImage from '../image/ProfileImage';

const RecommendItem = () => {
  return (
    <View style={styles.recommendItem}>
      <View style={styles.colContainer}>
        <ProfileImage style={styles.profileImage} />
        <Text style={styles.name}>이름</Text>
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
    width: 100,
    flexDirection: 'row',
  },
  colContainer: {
    display: 'flex',
    flexDirection: 'column',
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
  name: {},
  musicIcon: {
    color: 'blue',
    size: 30,
  },
});

export default RecommendItem;
