import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import { RootStackParamList } from './types';
import BottomTab from './BottomTab';
import ChatScreen from './ChatScreen';

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => (
  <Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
    <Screen name="Login" component={LoginScreen} />
    <Screen name="Chat" component={ChatScreen} />
    <Screen name="BottomTab" component={BottomTab} />
  </Navigator>
);

export default RootStack;
