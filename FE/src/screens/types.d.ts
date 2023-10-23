import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from "@react-navigation/native"

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type HomeScreenProps = NativeStackNavigationProp<RootStackParamList,"Home">
export type LoginScreenProps = NativeStackNavigationProp<RootStackParamList, 'Login'>;
