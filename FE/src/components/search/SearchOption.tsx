import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Props from '@/types';

type SearchOptionProps = Props;

const SearchOption = ({ style }: SearchOptionProps) => {
  return (
    <View style={[style, styles.searchOption]}>
      <Text style={styles.text}>option</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  searchOption: {
    height: 100,
    width: 100,
    flex: 1,
  },
  text: {
    padding: 20,
    flex: 1,
  },
});

export default SearchOption;
