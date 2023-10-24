import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';

// friendTab
export type FriendStackParamList = {
  FriendList: undefined;
  Chat: undefined;
};

export type FriendStackNavigationScreenParams =
  NavigatorScreenParams<FriendStackParamList>;

// bottomTab
export type MyBottomTabParamList = {
  Home: undefined;
  Profile: undefined;
  Friend: FriendTabNavigationScreenParams;
  Recommend: undefined;
};

export type MyBottomTabNavigationScreenParams =
  NavigatorScreenParams<MyBottomTabParamList>;

// rootStack
export type RootStackParamList = {
  Login: undefined;
  Player: undefined;
  BottomTab: BottomTabNavigationScreenParams;
};
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type FriendStackNavigationProp = CompositeNavigationProp<
  RootStackNavigationProp,
  NativeStackNavigationProp<FriendStackParamList>
>;

export type MyBottomTabNavigationProp = CompositeNavigationProp<
  RootStackNavigationProp,
  BottomTabNavigationProp<MyBottomTabParamList>
>;

export type MyNavigationProp = CompositeNavigationProp<
  RootStackNavigationProp,
  MyBottomTabNavigationProp,
  FriendStackNavigationProp
>;

export type HomeScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;
export type LoginScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;
