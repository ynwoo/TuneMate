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
import { LOGIN_URL } from '@env';
import { storage } from '@/utils/storage';
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const onLogin = async () => {
    await inAppBrower.openLink(LOGIN_URL);
    console.log('끝?');
  };

  const onMoveMain = async () => {
    const accessToken =
      'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJjYjg5OWJjOC0zM2E5LTQzYTYtOTM4Yy03NmIwZWMyODZjNzciLCJleHAiOjE2OTg5MDIzODYsImlzcyI6InR1bmVtYXRlIn0.yZWLMjhGW7SCTcEwSR_25tNFn-FmTT2Ue4FH7NQv0JwHWhMuLNkxdlq3NThg4ECO';
    const userId = 'cb899bc8-33a9-43a6-938c-76b0ec286c77';
    await storage.setAccessToken(accessToken);
    await storage.setUserId(userId);
    navigation.navigate('BottomTab');
  };

  const handleOpenURL = ({ url }: any) => {
    const path = url.split('//')[1];
    console.log('url', url);
    console.log('path', path);
  };

  Linking.addEventListener('url', handleOpenURL);

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
