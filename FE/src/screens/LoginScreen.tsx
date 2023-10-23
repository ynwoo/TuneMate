import { Button, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({navigation}:LoginScreenProps) => {
return (
    <View>
        <Text>LoginScreen</Text>
        <Button title='Login' onPress={()=> navigation.push("Home")}/>
    </View>
);
};

const {} = StyleSheet.create({});

export default LoginScreen;