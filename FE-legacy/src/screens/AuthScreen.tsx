import React from 'react';
import { useNavigation } from '@react-navigation/core';
import SpotifyAccount from '@/components/webView/SpotifyAccount';
import { AuthScreenProps, RootStackNavigationProp } from './types';

const AuthScreen = ({ route }: AuthScreenProps) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { uri } = route.params;
  return <SpotifyAccount uri={uri} />;
};

export default AuthScreen;
