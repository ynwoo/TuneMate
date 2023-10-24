import React from 'react';
import { View, StyleSheet } from 'react-native';
import RecommendItem from './RecommendItem';

const RecommendList = () => {
  return (
    <View style={styles.recommendList}>
      <RecommendItem />
      <RecommendItem />
      <RecommendItem />
      <RecommendItem />
    </View>
  );
};

const styles = StyleSheet.create({
  recommendList: {
    marginLeft: 20,
    marginRight: 20,
  },
});

export default RecommendList;
