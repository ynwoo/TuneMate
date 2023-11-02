import { Button, StyleSheet, Text, View } from 'react-native';
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
  };

  const onMoveMain = async () => {
    const accessToken =
      'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJjYjg5OWJjOC0zM2E5LTQzYTYtOTM4Yy03NmIwZWMyODZjNzciLCJleHAiOjE2OTg5MDk3MzEsImlzcyI6InR1bmVtYXRlIn0.2-sbsiSPVgynrQ0SID5iO4h1IyoP8MOALcqPXqzsds2tQGcs2cCFij10_ULK_d5k';
    const userId = 'cb899bc8-33a9-43a6-938c-76b0ec286c77';
    await storage.setAccessToken(accessToken);
    await storage.setUserId(userId);

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
