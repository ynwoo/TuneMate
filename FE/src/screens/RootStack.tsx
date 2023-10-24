import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from './LoginScreen';
import { RootStackParamList } from './types';
import BottomTab from './BottomTab';
import ChatScreen from './ChatScreen';
import PlayerScreen from './PlayerScreen';

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => (
  <Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
    <Screen name="Login" component={LoginScreen} />
    <Screen name="Chat" component={ChatScreen} />
    <Screen name="Player" component={PlayerScreen} />
    <Screen name="BottomTab" component={BottomTab} />
  </Navigator>
);

export default RootStack;
