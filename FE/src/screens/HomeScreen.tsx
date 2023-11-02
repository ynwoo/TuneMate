import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { RootStackNavigationProp } from './types';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <LinearGradient colors={['#e4ddff', '#ffffff']} style={{ flex: 1 }}>
      <View style={block}>
        <Text>home</Text>
        <Button title="player" onPress={() => navigation.navigate('Player')} />
      </View>
    </LinearGradient>
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
