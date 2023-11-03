import { StyleSheet, View } from 'react-native';
import React from 'react';
import RecommendList from '@/components/recommend/RecommendList';
import SearchOption from '@/components/search/SearchOption';
import useRecommendationFriendsQuery from '@/hooks/queries/recommendation/useRecommendationFriendsQuery';

const RecommendScreen = (): JSX.Element => {
  // const { data: recommendList } = useRecommendationFriendsQuery();
  return (
    <View style={styles.recommendScreen}>
      <SearchOption style={styles.searchOption} />
      <RecommendList recommendList={[]} style={styles.recommendList} />
      {/* {recommendList && (
        <RecommendList
          recommendList={recommendList}
          style={styles.recommendList}
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  recommendScreen: {
    flex: 1,
  },
  searchOption: {
    margin: 30,
  },
  recommendList: {
    flex: 1,
  },
});

export default RecommendScreen;
