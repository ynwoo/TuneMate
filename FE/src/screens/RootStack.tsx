import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import { RootStackParamList } from './types';

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => (
  <Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
    <Screen name="Login" component={LoginScreen} />
    <Screen name="Home" component={HomeScreen} />
  </Navigator>
);

export default RootStack;