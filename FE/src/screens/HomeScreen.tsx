import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={block}>
      <Text>home</Text>
    </View>
  );
};

const { block } = StyleSheet.create({
  title: {
    fontSize: 24,
  },
  block: {
    flex: 1,
    backgroundColor: '#ececec',
  },
});

export default HomeScreen;
