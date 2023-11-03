import WebView from 'react-native-webview';
import React from 'react';
import Props from '@/types';

interface SpotifyAccountProps extends Props {
  uri: string;
}

const SpotifyAccount = ({ uri }: SpotifyAccountProps) => {
  return (
    <WebView
      source={{
        uri,
      }}
    />
  );
};

export default SpotifyAccount;
