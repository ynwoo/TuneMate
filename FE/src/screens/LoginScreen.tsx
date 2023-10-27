import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { RootStackNavigationProp } from './types';
import { redirectToAuthCodeFlow } from '@/utils/generateCode';
import { inAppBrower } from '@/utils/inAppBrowser';

const LoginScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const onLogin = async () => {
    const uri = await redirectToAuthCodeFlow();
    // navigation.navigate('Auth', { uri });
    await inAppBrower.openLink(uri);
  };

  return (
    <View style={styles.block}>
      <Text testID="title" style={styles.title}>
        Tunemate
      </Text>
      <View style={styles.Button}>
        <Button title="Login" onPress={onLogin} />
      </View>
      <View style={styles.Button}>
        <Button
          title="비회원"
          onPress={() => {
            navigation.navigate('BottomTab');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
  },
  Button: {
    width: 200,
    height: 50,
  },
});

export default LoginScreen;
