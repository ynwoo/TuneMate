import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from './LoginScreen';
import { RootStackParamList } from './types';
import BottomTab from './BottomTab';
import PlayerScreen from './PlayerScreen';
import ChatScreen from './ChatScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Player" component={PlayerScreen} />
    <Stack.Screen name="Chat" component={ChatScreen} />
    <Stack.Screen name="BottomTab" component={BottomTab} />
  </Stack.Navigator>
);

export default RootStack;
