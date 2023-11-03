import { Button, Linking, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { RootStackNavigationProp } from './types';
import { inAppBrower } from '@/utils/inAppBrowser';
import { API_BASE_URL, LOGIN_URL } from '@env';
import { storage } from '@/utils/storage';
import axios from 'axios';

const LoginScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const onLogin = async () => {
    await inAppBrower.openLink(LOGIN_URL);
    console.log('끝?');
  };

  const onMoveMain = async () => {
    const accessToken =
      'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIyM2NiOTFkMy03OGFjLTQ1YjAtOTk1YS0zOGY4YmQzNDhkZmYiLCJleHAiOjE2OTg5NzgwNjYsImlzcyI6InR1bmVtYXRlIn0.bMxmuKUZt97oPfVLdGz6f-zQPWjrtPYImiaLRfozD2-yKpQ7U-f3DHLoLAEV_tCz';
    const userId = '23cb91d3-78ac-45b0-995a-38f8bd348dff';
    await storage.setAccessToken(accessToken);
    await storage.setUserId(userId);
    console.log(await storage.getAccessToken());
    console.log(await storage.getUserId());

    axios.defaults.baseURL = API_BASE_URL;
    axios.defaults.headers.common['Authorization'] = accessToken;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    navigation.navigate('BottomTab');
  };

  // const handleOpenURL = ({ url }: any) => {
  //   const path = url.split('//')[1];
  //   console.log('url', url);
  //   console.log('path', path);
  // };

  // Linking.addEventListener('url', handleOpenURL);

  return (
    <View style={styles.block}>
      <Text testID="title" style={styles.title}>
        Tunemate
      </Text>
      <View style={styles.Button}>
        <Button title="Login" onPress={onLogin} />
      </View>
      <View style={styles.Button}>
        <Button title="비회원" onPress={onMoveMain} />
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
