import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from "@react-navigation/native"


export type BottomTabParamList = {
  Home: undefined;
  Profile: undefined;
  FriendList: undefined;
  Recommend: undefined;
};

export type BottomTabNavigationScreenParams =
  NavigatorScreenParams<BottomTabParamList>;

export type BottomTabNavigationProp = CompositeNavigateionProp<
  RootStackNavigationProp,
  BottomTabNavigationProp<BottomTabParamList>
>;

export type RootStackParamList = {
  Login: undefined;
  Chat: undefined;
  Player: undefined;
  BottomTab:BottomTabNavigationScreenParams;
};
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type HomeScreenProps = NativeStackNavigationProp<RootStackParamList,"Home">
export type LoginScreenProps = NativeStackNavigationProp<RootStackParamList, 'Login'>;