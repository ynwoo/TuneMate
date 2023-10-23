import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen = ({}: ProfileScreenProps): JSX.Element => {
return (
    <View>
        <Text>ProfileScreen</Text>
    </View>
);
};

const {} = StyleSheet.create({});

export default ProfileScreen;