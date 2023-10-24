import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import FriendListScreen from './FriendListScreen';
import ChatScreen from './ChatScreen';
import { FriendStackParamList } from './types';

const FriendScreen = () => {
  const Stack = createNativeStackNavigator<FriendStackParamList>();
  return (
    <Stack.Navigator
      initialRouteName="FriendList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="FriendList" component={FriendListScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default FriendScreen;
