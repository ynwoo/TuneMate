import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import RecommendItem from './RecommendItem';
import { Friend } from '@/types/friend';
import Props from '@/types';

type RecommendListProps = Props;

const data: Friend[] = [
  { id: '0', name: 'a' },
  { id: '1', name: 'b' },
  { id: '2', name: 'c' },
  { id: '3', name: 'd' },
  { id: '4', name: 'e' },
  { id: '6', name: 'b' },
  { id: '7', name: 'c' },
  { id: '8', name: 'd' },
  { id: '9', name: 'e' },
];

const RecommendList = ({ style }: RecommendListProps) => {
  return (
    <FlatList
      style={[style, styles.recommendList]}
      data={data}
      renderItem={({ item }) => (
        <RecommendItem key={item.id} style={styles.recommendItem} item={item} />
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
