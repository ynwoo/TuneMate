import { Button, Linking, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
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

  // useEffect(() => {
  //   const getInitURL = async () => {
  //     const initURL = await Linking.getInitialURL(); // 없을 경우 null을 반환한다.
  //     if (initURL) {
  //       const path = initURL.split('//')[1];
  //       console.log(path);

  //       if (path.startsWith('?code=')) {
  //         const code = decodeURIComponent(path.slice(6));
  //         console.log(code);
  //       }
  //     }
  //   };
  //   getInitURL();
  // }, []);

  const handleOpenURL = ({ url }: any) => {
    const path = url.split('//')[1];
    console.log('url', url);
    console.log('path', path);

    // if (path.startsWith('wc?uri=')) {
    //   const uri = decodeURIComponent(path.slice(7));
    //   navigation.navigate('작업 처리할 컴포넌트', { uri: uri ? uri : '' });
    // }
  };

  Linking.addEventListener('url', handleOpenURL);

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
