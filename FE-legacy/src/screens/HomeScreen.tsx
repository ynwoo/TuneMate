import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { RootStackNavigationProp } from './types';

const HomeScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <View style={block}>
      <Text>home</Text>
      <Button title="player" onPress={() => navigation.navigate('Player')} />
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
