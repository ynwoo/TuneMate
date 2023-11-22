import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Props from '@/types';

type SearchOptionProps = Props;

const SearchOption = ({ style }: SearchOptionProps) => {
  return (
    <Pressable style={[style, styles.searchOption]}>
      <Text style={styles.text}>거리</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  searchOption: {
    height: 50,
  },
  text: {
    flex: 1,
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  hover: {
    backgroundColor: 'violet',
  },
});

export default SearchOption;
