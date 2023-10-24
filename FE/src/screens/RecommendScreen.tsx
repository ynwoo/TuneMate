import { StyleSheet, View } from 'react-native';
import React from 'react';
import RecommendList from '@/components/recommend/RecommendList';
import SearchOption from '@/components/search/SearchOption';

const RecommendScreen = (): JSX.Element => {
  return (
    <View style={styles.recommendScreen}>
      <SearchOption style={styles.searchOption} />
      <RecommendList style={styles.recommendList} />
    </View>
  );
};

const styles = StyleSheet.create({
  recommendScreen: {},
  searchOption: {},
  recommendList: {},
});

export default RecommendScreen;
