import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import RecommendItem from './RecommendItem';
import Props from '@/types';
import { RecommendationFriend } from '@/types/social';

interface RecommendListProps extends Props {
  recommendList: RecommendationFriend[];
}

const data: RecommendationFriend[] = [
  { userId: '0', name: 'a' },
  { userId: '1', name: 'b' },
  { userId: '2', name: 'c' },
  { userId: '3', name: 'd' },
  { userId: '4', name: 'e' },
  { userId: '6', name: 'b' },
  { userId: '7', name: 'c' },
  { userId: '8', name: 'd' },
  { userId: '9', name: 'e' },
] as RecommendationFriend[];

const RecommendList = ({ style, recommendList }: RecommendListProps) => {
  return (
    <FlatList
      style={[style, styles.recommendList]}
      data={data}
      renderItem={({ item }) => (
        <RecommendItem
          key={item.userId}
          style={styles.recommendItem}
          item={item}
        />
      )}
      horizontal={false}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  recommendList: {
    marginLeft: 20,
    marginRight: 20,
  },
  recommendItem: { margin: 10 },
});

export default RecommendList;
