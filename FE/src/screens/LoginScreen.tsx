import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
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
  };

  const onMoveMain = async () => {
    const accessToken =
      'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJjYjg5OWJjOC0zM2E5LTQzYTYtOTM4Yy03NmIwZWMyODZjNzciLCJleHAiOjE2OTg5MTM3NDIsImlzcyI6InR1bmVtYXRlIn0.y6qFqGhKnCOxXINPgukR4qfuB0p0S8HBPRTUI7t4RebPova3p09KrtDaW_2Y9wBA';
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
