import {
  Button,
  Linking,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import React, { useState, useE } from 'react';
import { RootStackNavigationProp } from './types';
import { inAppBrower } from '@/utils/inAppBrowser';
import { API_BASE_URL, LOGIN_URL } from '@env';
import { storage } from '@/utils/storage';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const LoginScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const onLogin = async () => {
    await inAppBrower.openLink(LOGIN_URL);
    console.log('끝?');
  };

  const onMoveMain = async () => {
    const accessToken =
      'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhYjFiNGI3Zi1hYmIyLTRiZjEtOTIwZi1iNDM3MjMzYjRmNDciLCJleHAiOjE2OTg5MjA3MzUsImlzcyI6InR1bmVtYXRlIn0.-VunTqC4EzOBj0l9a5LTezoWT6_xFiHEKGnjtF7kzsXAErkx3Xm-N2pfaJ-lSnAZ';
    const userId = 'ab1b4b7f-abb2-4bf1-920f-b437233b4f47';
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
    <LinearGradient colors={['#e4ddff', '#ffffff']} style={{ flex: 1 }}>
      <View style={styles.block}>
        <Image
          source={require('../assets/images/TuneMate.png')} // 이미지 파일의 경로로 변경
          style={styles.image}
        />
        <View style={styles.Button}>
          <Pressable onPress={onLogin}>
            <Text style={{ fontSize: 18 }}>LOGIN</Text>
          </Pressable>
        </View>
        <View style={styles.Button}>
          <Pressable onPress={onMoveMain}>
            <Text style={{ fontSize: 18 }}>비회원</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 70,
    fontFamily: 'LO',
  },
  Button: {
    width: 200,
    height: 40,
    backgroundColor: 'white',
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 10,
  },
  image: {
    width: 300, // 이미지의 너비
    height: 50, // 이미지의 높이
    marginBottom: 100,
  },
});

export default LoginScreen;
