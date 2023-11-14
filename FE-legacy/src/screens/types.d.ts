import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { UserInfo } from '@/types/user';

// bottomTab
export type MyBottomTabParamList = {
  Home: undefined;
  Profile: undefined;
  FriendList: undefined;
  Recommend: undefined;
};

export type MyBottomTabNavigationScreenParams =
  NavigatorScreenParams<MyBottomTabParamList>;

// rootStack
export type RootStackParamList = {
  Login: undefined;
  Player: undefined;
  Chat: undefined;
  Auth: { uri: string };
  BottomTab: BottomTabNavigationScreenParams;
  Profile: { userId: UserInfo['userId'] };
  SharedProfile: undefined;
};
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

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
export type AuthScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  'Auth'
>;
