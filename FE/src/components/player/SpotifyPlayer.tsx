import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const SpotifyPlayer = () => {
  const [token, setToken] = useState('[My access token]');

  useEffect(() => {
    // Spotify Web Playback SDK 초기화 및 설정
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });

      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.addListener('initialization_error', ({ message }) => {
        console.error(message);
      });

      player.addListener('authentication_error', ({ message }) => {
        console.error(message);
      });

      player.addListener('account_error', ({ message }) => {
        console.error(message);
      });

      // Spotify 재생 제어 로직을 구현

      player.connect();
    };
  }, [token]);

  return (
    <View>
      <Text>Spotify Web Playback SDK Quick Start</Text>
      <TouchableOpacity id="togglePlay">Toggle Play</TouchableOpacity>
    </View>
  );
};

export default SpotifyPlayer;
